<template>
  <p
    v-if="todoIsEditing"
    class="text-black sm:w-[28rem] sm:h-28 text-start h-32 w-64"
    @input="handleContentInputChange"
  >
    {{ todoContent }}
  </p>
  <p
    v-else
    class="text-neutral-500 hidden sm:block sm:text-2xl font-semibold fit"
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

const emit = defineEmits(["handleContentInputChange"]);
function handleContentInputChange(event: Event) {
  const newContent = (event.target as HTMLDivElement).innerText;
  emit("handleContentInputChange", newContent);
}
</script>
