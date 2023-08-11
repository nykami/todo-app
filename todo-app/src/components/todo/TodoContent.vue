<template>
  <p
    v-if="todoIsEditing"
    class="mb-2 h-28 w-64 text-start text-black sm:h-28 sm:w-[28rem]"
    @input="handleContentInputChange"
  >
    {{ todoContent }}
  </p>
  <p
    v-else
    class="fit hidden font-semibold text-neutral-500 sm:block sm:text-2xl"
  >
    {{ todoContent }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  todoContent: string;
  todoIsEditing: boolean;
}

defineProps<Props>();

const emit = defineEmits(['handleContentInputChange']);
function handleContentInputChange(event: Event) {
  const newContent = (event.target as HTMLDivElement).innerText;
  emit('handleContentInputChange', newContent);
}
</script>

<style>
[contenteditable] {
  outline: 0px solid transparent;
}
</style>
