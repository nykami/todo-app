<template>
  <div class="items-center flex flex-col">
    <PlaceholderIcon class="w-48 h-56 sm:w-64 sm:h-80 sm:mt-12 my-6 " />
    <div
      class="text-neutral-500 font-semibold text-6 sm:mt-6 sm:text-4xl"
    >
      You have no todos yet
    </div>
  </div>
</template>

<script setup lang='ts'>
import PlaceholderIcon from './icons/PlaceholderIcon.vue';
</script>
