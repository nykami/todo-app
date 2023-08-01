<template>
  <div
    v-if="todo.isEditing"
    class="text-black sm:w-[28rem] sm:h-28 text-start h-32 w-64"
    @input="handleContentInputChange"
  >
    {{ todo.content }}
  </div>
  <div
    v-else
    class="text-neutral-500 hidden sm:block sm:text-2xl font-semibold fit"
  >
    {{ todo.content }}
  </div>
</template>

<script setup lang="ts">
import { Todo } from "../types/Todo.vue";
interface Props {
  todo: Todo;
}

defineProps<Props>();

const emit = defineEmits(["handleContentInputChange"]);
function handleContentInputChange(event: Event) {
  const newContent = (event.target as HTMLDivElement).innerText;
  emit("handleContentInputChange", newContent);
}
</script>
