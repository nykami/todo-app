<template>
  <button
    class="mr-2 h-8 w-fit rounded-lg border border-black px-3 text-xs font-semibold sm:mr-3 sm:px-4 sm:text-sm"
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
