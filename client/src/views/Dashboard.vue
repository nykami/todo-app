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

const searchInput = ref<string>('');
const sortType = ref<string>('desc');
const sortByField = ref<string>('');
const isSortingApplied = ref<boolean>(false);

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
    await todoService.createArchive(todoId);
    await todoService.deleteTodo(todoId);
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
    if (isSortingApplied.value) applySortBy(sortByField.value);
  } catch (error) {
    console.log(error);
  }
}

function setEditState(todoId: string, value: boolean) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj._id === todoId);
  if (indexToUpdateAt === -1) return;
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

async function filterTodos(keyword: string) {
  try {
    searchInput.value = keyword;
    todos.value = await todoService.getTodos(
      userId,
      sortByField.value,
      sortType.value,
      searchInput.value,
      isSortingApplied.value,
    );
  } catch (error) {}
}

async function applySortBy(field: string) {
  try {
    sortByField.value = field;

    isSortingApplied.value = sortByField.value ? true : false;

    todos.value = await todoService.getTodos(
      userId,
      sortByField.value,
      sortType.value,
      searchInput.value,
      isSortingApplied.value,
    );
  } catch (error) {
    console.log(error);
  }
}

function changeSortType(newType: string) {
  sortType.value = newType;
  applySortBy(sortByField.value);
}
</script>
