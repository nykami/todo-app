<template>
  <div class="mb-8 mt-20 flex items-center justify-between">
    <div class="text-sm font-medium sm:text-2xl">Welcome to the app</div>
    <router-link
      :to="path"
      class="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 font-semibold sm:h-12 sm:w-28 sm:bg-neutral-200 sm:text-lg"
    >
      <button class="hidden sm:relative sm:flex">
        <div class="w-16">{{ buttonName }}</div>
        <span class="relative flex h-3 w-3">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"
          ></span>
        </span>
      </button>

      <RightArrowIcon class="sm:hidden" />
    </router-link>
  </div>
  <hr />
</template>

<script setup lang="ts">
import RightArrowIcon from '../icons/RightArrowIcon.vue';

interface Props {
  buttonName: string;
  path: string;
}

defineProps<Props>();
</script>
