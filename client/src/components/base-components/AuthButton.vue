<template>
  <button
    class="sm:text-md w-full rounded-lg bg-teal-400 px-6 py-1.5 text-sm font-semibold text-white sm:py-2"
    type="submit"
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
