<template>
  <div class="container mx-auto px-70 text-center">
    <header class="relative">
      <h1 class="block m-10 text-4xl font-semibold">Todo List</h1>
      <button
        @click="clearTodos"
        class="absolute top-0 right-0 p-4 rounded-full bg-gray-300"
      >
        Clear all
      </button>
    </header>
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Enter your task"
        class="m-4 p-4 rounded-lg border-solid border-2 w-96"
      />
      <button type="submit" class="p-4 rounded-full text-white bg-green-400">
        Add Todo
      </button>
    </form>
    <ul class="space-y-2 mx-40">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="flex justify-between border-2 p-2 rounded-lg px-8"
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

const todos = ref<string[]>([]);
const newTodo = ref<string>("");

const addTodo = () => {
  if (newTodo.value.trim() !== "") {
    todos.value.push(newTodo.value.trim());
    newTodo.value = "";
  }
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};

const clearTodos = () => {
  todos.value = [];
};
</script>
