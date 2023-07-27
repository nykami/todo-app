<template>
  <div class="flex flex-col items-center">
    <ul class="w-72 h-12 sm:w-full sm:h-40">
      <li
        class="flex flex-col text-center border border-black p-4 rounded-lg mb-4 sm:mb-10"
        v-for="(todo, index) in props.todos"
        :key="index"
      >
        <TodoItem :todo="todo" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import { Todo } from "../types/ITodoItem.vue";

interface Props {
  todos: Todo[];
}

const props = defineProps<Props>();
</script>
