<template>
  <div class="items-center flex flex-col">
    <PlaceholderIcon class="w-[12rem] h-[14rem] sm:w-[17rem] sm:h-[19.6rem] sm:mt-[3rem] my-[1.5rem] " />
    <div
      class="text-neutral-500 font-semibold text-[1.5rem] sm:mt-6 sm:text-[2.6rem]"
    >
      You have no todos yet
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from "./icons/PlaceholderIcon.vue";
</script>
