<template>
  <div
    class="font-semibold text-lg sm:text-4xl"
    @input="handleTitleInputChange"
  >
    {{ todo.title }}
  </div>
</template>

<script setup lang="ts">
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}

defineProps<Props>();

const emit = defineEmits(["handleTitleInputChange"]);

function handleTitleInputChange(event: Event) {
  const newTitle = (event.target as HTMLDivElement).innerText;
  emit("handleTitleInputChange", newTitle);
}
</script>
