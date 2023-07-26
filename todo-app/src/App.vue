<template>
  <div class="flex flex-col items-center justify-center">
    <!-- <button
      class="absolute top-0 right-0 p-4 rounded-full bg-gray-300"
      @click="clearTodos"
    >
      Clear all
    </button> -->
    <TodoHeader @addTodo="addTodo" />
    <TodoPlaceholder v-if="!todos.length" />
    <TodoList
      :todos="todos"
      @removeTodo="removeTodo"
      @clearTodos="clearTodos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoPlaceholder from "./components/TodoPlaceholder.vue";

interface Todo {
  id: number;
  title: string;
  content: string;
  importance: string;
}

const todos = ref<Todo[]>([]);
let idCounter = ref<number>(0);

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearTodos() {
  todos.value = [];
}

function addTodo(defaultTodo: Todo) {
  console.log(todos.value);

  defaultTodo.id = idCounter.value++;
  todos.value.push(defaultTodo);
}
</script>
