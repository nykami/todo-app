<template>
  <div
    class="flex flex-row sm:flex-col justify-between items-center"
    @click="todo.isEdited = true"
  >
    <div class="flex flex-col">
      <div class="flex flex-row sm:justify-between sm:w-38rem">
        <div class="font-semibold text-lg sm:text-4xl">
          {{ todo.title }}
        </div>
        <TodoImportance :todo="todo"/>
      </div>
      <div class="flex items-center w-full text-zinc-800 text-xs font-normal">
        <CalendarIcon class="mr-1 sm:hidden block" />
        {{ todo.date }}
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row justify-between sm:pt-6 sm:mt-6 sm:w-full"
    >
      <div class="text-neutral-500 hidden sm:block sm:text-2xl font-semibold fit">
        {{ todo.content }}
      </div>
      <TodoCheckbox :todo="todo"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoCheckbox from "./TodoCheckbox.vue";
import TodoImportance from "./TodoImportance.vue";
import CalendarIcon from "../icons/CalendarIcon.vue";
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}
defineProps<Props>();


</script>
