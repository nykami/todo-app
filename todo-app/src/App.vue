<template>
  <div class="flex flex-col items-center justify-center">
    <button
      class="absolute top-0 right-0 p-4 rounded-full bg-gray-300"
      @click="clearTodos"
    >
      Clear all
    </button>
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


const todos = ref<string[]>([]);

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearTodos() {
  todos.value = [];
}

function addTodo(todo: string) {
  todos.value.push(todo);
}

</script>
