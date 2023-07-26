<template>
  <div class="flex justify-between items-center mt-20 mb-8">
    <div class="text-sm sm:text-2xl font-medium">
        Welcome to the app
    </div>
    <div
      class="w-[3rem] h-[3rem] border border-neutral-200 sm:w-[7rem] sm:h-[3rem] font-semibold sm:text-lg sm:bg-neutral-200 rounded-2xl flex items-center justify-center"
    >
      <!-- Add "flex items-center justify-center" classes to center the content -->
      <button class="hidden sm:block">
        Log in
    </button>
    <RightArrowIcon class="sm:hidden"/>
    </div>
  </div>
  <hr />
</template>

<script setup lang="ts">
import RightArrowIcon from './icons/RightArrowIcon.vue';
</script>
