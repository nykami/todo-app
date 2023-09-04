<template>
  <p
    v-if="todoIsEditing"
    class="fit my-2 w-64 break-all text-start text-black sm:block sm:w-112"
    @input="handleContentInputChange"
  >
    {{ todoDescription }}
  </p>
  <p
    v-else
    class="fit my-2 hidden break-all text-start font-semibold text-neutral-500 sm:block sm:w-112 sm:text-2xl"
  >
    {{ todoDescription }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  todoDescription: string;
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
