<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <button
      class="absolute top-0 right-0 p-4 rounded-full bg-gray-300"
      @click="clearTodos"
    >
      Clear all
    </button>
    <!-- <form >
      <input
        class="m-4 p-4 rounded-lg border-solid border-2 w-96"
        type="text"
        placeholder="Enter your task"
      />
    </form> -->
    <ul class="w-[610px] h-[317px]">
      <li
        class="flex justify-between border-2 p-2 rounded-lg mb-4"
        v-for="(todo, index) in todos"
        :key="index"
      >
        {{ todo }}
        <button class="p-4 rounded-full bg-gray-300" @click="removeTodo(index)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const todos = ref<string[]>([]);

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearTodos() {
  todos.value = [];
}
</script>
