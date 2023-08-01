<template>
  <div class="flex items-center w-full text-zinc-800 text-xs font-normal sm:ml-2">
    <CalendarIcon class="mr-1 sm:hidden block" />
    {{ todo.date }}
  </div>
</template>

<script setup lang="ts">
import CalendarIcon from "../icons/CalendarIcon.vue";
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}

defineProps<Props>();
</script>
