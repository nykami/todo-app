<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin :username="username" path="/login" button-name="Log out" />
    <TodoHeader @addTodo="addTodo" />
    <SearchBar v-if="todos.length" @filterTodos="filterTodos" />
    <Sorting
      v-if="todos.length"
      :sortType="sortType"
      :sortByField="sortByField"
      @handleSort="applySortBy"
      @toggleSortType="changeSortType"
    />
    <TodoPlaceholder v-if="!todos.length" />
    <TodoList
      :reversedTodos="reversedTodos"
      @deleteTodo="deleteTodo"
      @updateTodo="updateTodo"
      @setEditState="setEditState"
      @handleCheckboxClick="handleCheckboxClick"
    />
    <div v-if="!filteredTodos.length && todos.length" class="text-center">
      No todos found
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import TodoLogin from '../components/header/TodoLogin.vue';
import TodoHeader from '../components/header/TodoHeader.vue';
import TodoPlaceholder from '../components/TodoPlaceholder.vue';
import TodoList from '../components/TodoList.vue';
import SearchBar from '../components/SearchBar.vue';
import Sorting from '../components/Sorting.vue';
import { Todo } from '../components/types/Todo.vue';
import TodoService from '../service/TodoService';
import UserService from '../service/UserService';
import { useRoute } from 'vue-router';

const searchText = ref<string>('');
const sortType = ref<string>('desc');
const sortByField = ref<string>('');
const isSortingApplied = ref(false);

const todoService = new TodoService();
const userService = new UserService();
const route = useRoute();
const userId = route.params.userId.toString();

const username = ref<string>('');
const todos = ref<Todo[]>([]);
const filteredTodos = ref<Todo[]>([]);

onMounted(async () => {
  todos.value = await todoService.getTodos(
    userId
  );

  const fetchedUsername = await userService.getUsername(userId);
  if (fetchedUsername !== undefined) {
    username.value = fetchedUsername;
  }
  filteredTodos.value = todos.value;
});

const reversedTodos = computed(() => {
  return todos.value.slice().reverse();
});

async function addTodo() {
  try {
    const todo = await todoService.addTodo(userId);
    todos.value.push(todo);
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(todoId: string) {
  try {
    const todoIndex = todos.value.findIndex((todo) => todo._id === todoId);
    if (todoIndex !== -1) {
      todos.value.splice(todoIndex, 1);
    }
    await todoService.deleteTodo(todoId);
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(newTodo: Todo, todoId: string) {
  try {
    setEditState(todoId, false);
    if (newTodo.title === '') {
      newTodo.title = 'Title';
    }
    if (newTodo.description === '') {
      newTodo.description = 'Description';
    }
    await todoService.updateTodo(todoId, newTodo);
    if (isSortingApplied.value) applySortBy(sortByField.value);
  } catch (error) {
    console.log(error);
  }
}

function setEditState(todoId: string, value: boolean) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj._id === todoId);
  todos.value[indexToUpdateAt].isEditing = value;
}

function handleCheckboxClick(todoId: number) {
  const indexToUpdateAt = todos.value.findIndex(
    (todo) => parseInt(todo._id) === todoId,
  );
  const todoToMakeFloat = todos.value[indexToUpdateAt];
  todoToMakeFloat.isChecked = !todoToMakeFloat.isChecked;
  if (isSortingApplied.value) {
    return;
  } else {
    setTimeout(() => {
      if (todoToMakeFloat.isChecked) {
        todos.value.splice(indexToUpdateAt, 1);
        todos.value.unshift(todoToMakeFloat);
      } else {
        todos.value.splice(indexToUpdateAt, 1);
        todos.value.push(todoToMakeFloat);
      }
    }, 500);
  }
}

function filterTodos(searchInput: string) {
  searchText.value = searchInput.toLowerCase();
}

function sortByTitle() {
  todos.value.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return sortType.value === 'desc'
      ? titleB.localeCompare(titleA)
      : titleA.localeCompare(titleB);
  });
}

function compareDateComponents(componentA: string, componentB: string) {
  return sortType.value === 'desc'
    ? componentB.localeCompare(componentA)
    : componentA.localeCompare(componentB);
}

function sortByDate() {
  todos.value.sort((a, b) => {
    const dateA = a.date.toLocaleDateString();

    const dateB = b.date.toLocaleDateString();

    const [dayA, monthA, yearA] = dateA.split('/');
    const [dayB, monthB, yearB] = dateB.split('/');

    const yearComparison = compareDateComponents(yearA, yearB);
    if (yearComparison !== 0) {
      return yearComparison;
    }

    const monthComparison = compareDateComponents(monthA, monthB);
    if (monthComparison !== 0) {
      return monthComparison;
    }

    return compareDateComponents(dayA, dayB);
  });
}

function sortByPriority() {
  const priorityValues: Record<string, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  todos.value.sort((a, b) => {
    const priorityA = priorityValues[a.priority];
    const priorityB = priorityValues[b.priority];
    return sortType.value === 'desc'
      ? priorityB - priorityA
      : priorityA - priorityB;
  });
}

function sortByDescription() {
  todos.value.sort((a, b) => {
    const descA = a.description.toLowerCase();
    const descB = b.description.toLowerCase();
    return sortType.value === 'desc'
      ? descB.localeCompare(descA)
      : descA.localeCompare(descB);
  });
}

function stopSort() {
  isSortingApplied.value = false;
  filteredTodos.value.forEach((todo) => {
    setTimeout(() => {
      if (todo.isChecked) {
        todo.isChecked = false;
        handleCheckboxClick(parseInt(todo._id));
      }
    }, 300);
  });
}

function applySortBy(field: string) {
  sortByField.value = field;
  if (sortByField.value === '') {
    stopSort();
    return;
  }
  isSortingApplied.value = true;
  switch (field) {
    case 'title': {
      sortByTitle();
      break;
    }
    case 'date': {
      sortByDate();
      break;
    }
    case 'importance': {
      sortByPriority();
      break;
    }
    case 'description': {
      sortByDescription();
      break;
    }
  }
}

function changeSortType(newType: string) {
  sortType.value = newType;

  applySortBy(sortByField.value);
}
</script>
