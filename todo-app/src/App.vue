<template>
  <div class="flex flex-col justify-center items-center">
    <div class="max-w-screen-sm h-full">
      <TodoLogin />
      <TodoHeader @addTodo="addTodo" />
      <SearchBar @filterTodos="filterTodos" />
      <Sorting
        @handleSortByTitle="sortByTitle"
        @handleSortByDate="sortByDate"
        @handleSortByPriority="sortByPriority"
      />
      <TodoPlaceholder v-if="!todos.length" />
      <TodoList
        v-else
        :reversedTodos="reversedTodos"
        @deleteTodo="deleteTodo"
        @updateTodo="updateTodo"
        @setIsEditingTrue="setIsEditingTrue"
        @handleCheckboxClick="handleCheckboxClick"
      />
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
  todoToUpdate.content = newTodo.content;
  todoToUpdate.title = newTodo.title;
  todoToUpdate.importance = newTodo.importance;
  todoToUpdate.isEditing = false;
}

function setIsEditingTrue(todoId: number) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value[indexToUpdateAt].isEditing = true;
}

function handleCheckboxClick(todoId: number) {
  const indexToUpdateAt = todos.value.findIndex((todo) => todo.id === todoId);
  const todoToMakeFloat = todos.value[indexToUpdateAt];
  todoToMakeFloat.isChecked = !todoToMakeFloat.isChecked;
  setTimeout(() => {
    if (todoToMakeFloat.isChecked) {
      todos.value.splice(indexToUpdateAt, 1);
      todos.value.unshift(todoToMakeFloat);
    } else {
      todos.value.splice(indexToUpdateAt, 1);
      todos.value.push(todoToMakeFloat);
    }
  }, 600);
}

function filterTodos(searchInput: string) {
  searchText.value = searchInput.toLowerCase();
}

function sortByTitle() {
  todos.value.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA > titleB) {
      return -1;
    }
    if (titleA < titleB) {
      return 1;
    }
    return 0;
  });
}

function compareDateComponents(componentA: string, componentB: string) {
  if (componentA === componentB) {
    return 0;
  }
  return componentA < componentB ? -1 : 1;
}

function sortByDate() {
  todos.value.sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;

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
    const priorityA = priorityValues[a.importance];
    const priorityB = priorityValues[b.importance];
    return priorityA - priorityB;
  });
}
</script>
