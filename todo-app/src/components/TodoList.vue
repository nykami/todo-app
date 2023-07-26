<template>
  <div class="flex flex-col items-center">
    <ul class="w-[18rem] h-[3rem] sm:w-[38rem] sm:h-[10rem]">
      <li
        class="flex flex-col text-center border border-black p-4 rounded-lg mb-4 sm:mb-10"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <TodoItem :todo="todo" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
const { todos } = defineProps(["todos"]);
</script>
