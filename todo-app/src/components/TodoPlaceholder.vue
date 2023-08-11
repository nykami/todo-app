<template>
  <div class="mb-12 flex flex-col items-center">
    <PlaceholderIcon class="my-6 h-56 w-48 sm:mt-12 sm:h-80 sm:w-64" />
    <div class="text-6 font-semibold text-neutral-500 sm:mt-6 sm:text-4xl">
      You have no todos yet
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from './icons/PlaceholderIcon.vue';
</script>
