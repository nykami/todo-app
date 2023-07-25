<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <TodoHeader @addTodo="addTodo" />
    <button
      @click="clearTodos"
      class="absolute top-0 right-0 p-4 rounded-full bg-gray-300"
    >
      Clear all
    </button>
    <!-- <form >
      <input
        type="text"
        placeholder="Enter your task"
        class="m-4 p-4 rounded-lg border-solid border-2 w-96"
      />
    </form> -->
    <ul class="w-[610.01px] h-[317.16px]">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="flex justify-between border-2 p-2 rounded-lg mb-4"
      >
        {{ todo }}
        <button @click="removeTodo(index)" class="p-4 rounded-full bg-gray-300">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoHeader from "./TodoHeader.vue";

const todos = ref<string[]>([]);

const addTodo = (todo: string) => {
  todos.value.push(todo); 
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};

const clearTodos = () => {
  todos.value = [];
};
</script>
