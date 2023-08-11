<template>
  <div class="flex flex-col justify-center items-center font-custom">
    <div class="max-w-screen-sm">
      <TodoLogin />
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
        v-else
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TodoLogin from './components/header/TodoLogin.vue';
import TodoHeader from './components/header/TodoHeader.vue';
import TodoPlaceholder from './components/TodoPlaceholder.vue';
import TodoList from './components/TodoList.vue';
import SearchBar from './components/SearchBar.vue';
import Sorting from './components/Sorting.vue';
import { Todo } from './components/types/Todo.vue';

const todos = ref<Todo[]>([]);
const searchText = ref<string>('');
const sortType = ref<string>('desc');
const sortByField = ref<string>('');
const isSortingApplied = ref(false);

const filteredTodos = computed(() => {
  if (!searchText.value) {
    return todos.value;
  }
  return todos.value.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchText.value) ||
      todo.content.toLowerCase().includes(searchText.value)
  );
});

const reversedTodos = computed(() => {
  return filteredTodos.value.slice().reverse();
});

function findNextId(): number {
  let maxId = -1;
  todos.value.forEach((todo) => {
    if (todo.id > maxId) {
      maxId = todo.id;
    }
  });
  return maxId + 1;
}

function addTodo(defaultTodo: Todo) {
  defaultTodo.id = findNextId();
  todos.value.push(defaultTodo);
}

function deleteTodo(todoId: number) {
  const indexToRemoveFrom = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value.splice(indexToRemoveFrom, 1);
}

function updateTodo(newTodo: Todo, todoId: number) {
  const indexToUpdateAt = todos.value.findIndex((todo) => todo.id === todoId);
  const todoToUpdate = todos.value[indexToUpdateAt];
  if (newTodo.title) {
    todoToUpdate.title = newTodo.title;
  } else {
    todoToUpdate.title = 'Title';
  }
  if (newTodo.content) {
    todoToUpdate.content = newTodo.content;
  } else {
    todoToUpdate.content = 'Description';
  }
  todoToUpdate.importance = newTodo.importance;
  todoToUpdate.isEditing = false;
  todoToUpdate.date = newTodo.date;

  if (isSortingApplied) applySortBy(sortByField.value);
}

function setEditState(todoId: number, value: boolean) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value[indexToUpdateAt].isEditing = value;
}

function handleCheckboxClick(todoId: number) {
  const indexToUpdateAt = todos.value.findIndex((todo) => todo.id === todoId);
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
    const dateA = a.date;
    const dateB = b.date;

    const [dayA, monthA, yearA] = dateA.split('.');
    const [dayB, monthB, yearB] = dateB.split('.');

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
    const priorityA = priorityValues[a.importance];
    const priorityB = priorityValues[b.importance];
    return sortType.value === 'desc'
      ? priorityB - priorityA
      : priorityA - priorityB;
  });
}

function sortByDescription() {
  todos.value.sort((a, b) => {
    const descA = a.content.toLowerCase();
    const descB = b.content.toLowerCase();
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
        handleCheckboxClick(todo.id);
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
