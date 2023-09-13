<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin
      :username="username"
      path="/login"
      button-name="Log out"
      @click="logout"
    />
    <TodoHeader @addTodo="addTodo" />
    <template v-if="todos.length">
      <SearchBar @filterTodos="filterTodos" />
      <template v-if="filteredTodos.length">
        <Sorting
          :sortType="sortType"
          :sortByField="sortByField"
          @handleSort="applySortBy"
          @toggleSortType="changeSortType"
        />
        <TodoList
          :reversedTodos="reversedTodos"
          @deleteTodo="deleteTodo"
          @updateTodo="updateTodo"
          @setEditState="setEditState"
          @handleCheckboxClick="handleCheckboxClick"
        />
      </template>
      <template v-else class="text-center">No todos found</template>
    </template>
    <TodoPlaceholder v-else />
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

const searchInput = ref<string>('');
const sortType = ref<string>('desc');
const sortByField = ref<string>('');

const todoService = new TodoService();
const userService = new UserService();
const route = useRoute();
const userId = route.params.userId.toString();

const username = ref<string>('');
const todos = ref<Todo[]>([]);
const filteredTodos = ref<Todo[]>([]);

onMounted(async () => {
  todos.value = await todoService.getTodos(
    userId,
    sortByField.value,
    sortType.value,
    searchInput.value,
    isSortingApplied.value,
  );

  const fetchedUsername = await userService.getUsername(userId);
  username.value = fetchedUsername || '';
  filteredTodos.value = todos.value;
});

const reversedTodos = computed(() => {
  return filteredTodos.value.slice().reverse();
});

const isSortingApplied = computed(() => {
  return !!sortByField.value;
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
    if (todoIndex === -1) {
      throw new Error('Todo not found in the todos list.');
    }
    todos.value.splice(todoIndex, 1);

    await todoService.createArchive(todoId);
    await todoService.deleteTodo(todoId);

    // delete last todo from filtered todos
    if (!todos.value.length) {
      todos.value = await todoService.getTodos(
        userId,
        (sortByField.value = ''),
        sortType.value,
        (searchInput.value = ''),
        isSortingApplied.value,
      );
      filteredTodos.value = todos.value;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(newTodo: Todo, todoId: string) {
  try {
    setEditState(todoId, false);
    if (!newTodo.title) {
      newTodo.title = 'Title';
    }
    if (!newTodo.description) {
      newTodo.description = 'Description';
    }
    await todoService.updateTodo(todoId, newTodo);
    if (isSortingApplied.value) {
      applySortBy(sortByField.value);
    }
  } catch (error) {
    console.log(error);
  }
}

function setEditState(todoId: string, value: boolean) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj._id === todoId);
  if (indexToUpdateAt === -1) {
    return;
  }
  todos.value[indexToUpdateAt].isEditing = value;
}

async function handleCheckboxClick(todoId: string) {
  try {
    const updatedTodo = await todoService.updateIsChecked(todoId);

    const indexToUpdateAt = todos.value.findIndex(
      (todo) => todo._id === todoId,
    );

    if (indexToUpdateAt === -1) {
      throw new Error('Todo not found in the todos list.');
    }

    const todoToMakeFloat = todos.value[indexToUpdateAt];
    todoToMakeFloat.isChecked = updatedTodo.isChecked;
    if (isSortingApplied.value) {
      return;
    }
    setTimeout(() => {
      if (todoToMakeFloat.isChecked) {
        todos.value.splice(indexToUpdateAt, 1);
        todos.value.unshift(todoToMakeFloat);
      } else {
        todos.value.splice(indexToUpdateAt, 1);
        todos.value.push(todoToMakeFloat);
      }
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

async function filterTodos(keyword: string) {
  try {
    searchInput.value = keyword;
    filteredTodos.value = await todoService.getTodos(
      userId,
      sortByField.value,
      sortType.value,
      searchInput.value,
      isSortingApplied.value,
    );

    if (filteredTodos.value.length) {
      todos.value = filteredTodos.value;
    }
  } catch (error) {
    console.log(error);
  }
}

async function applySortBy(field: string) {
  try {
    sortByField.value = field;
    todos.value = await todoService.getTodos(
      userId,
      sortByField.value,
      sortType.value,
      searchInput.value,
      isSortingApplied.value,
    );
    filteredTodos.value = todos.value;
  } catch (error) {
    console.log(error);
  }
}

function changeSortType(newType: string) {
  sortType.value = newType;
  applySortBy(sortByField.value);
}

function logout() {
  localStorage.clear();
}
</script>
