<template>
  <div class="mb-8 mt-20 flex items-center justify-between">
    <div class="text-sm font-medium sm:text-2xl">Welcome to the app</div>
    <div
      class="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 font-semibold sm:h-12 sm:w-28 sm:bg-neutral-200 sm:text-lg"
    >
      <button class="hidden sm:block">Log in</button>
      <RightArrowIcon class="sm:hidden" />
    </div>
  </div>
  <hr />
</template>

<script setup lang="ts">
import RightArrowIcon from '../icons/RightArrowIcon.vue';
</script>
