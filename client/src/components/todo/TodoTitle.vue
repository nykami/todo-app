<template>
  <p
    class="break-all text-start text-lg font-semibold sm:my-2 sm:w-112 sm:text-4xl"
    @input="handleTitleInputChange"
  >
    {{ todoTitle }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  todoTitle: string;
}

defineProps<Props>();

const emit = defineEmits(['handleTitleInputChange']);

function handleTitleInputChange(event: Event) {
  const newTitle = (event.target as HTMLDivElement).innerText;
  emit('handleTitleInputChange', newTitle);
}
</script>
