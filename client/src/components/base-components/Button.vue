<template>
  <button
    class="flex h-7 w-16 items-center justify-center rounded-lg border text-sm font-semibold sm:h-12 sm:w-28 sm:rounded-2xl sm:text-lg"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonText: string;
}

defineProps<Props>();
</script>
