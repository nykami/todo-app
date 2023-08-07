<template>
  <div
    class="flex sm:flex-row flex-col justify-between sm:items-center items-start w-72 h-12 sm:w-full sm:h-full"
  >
    <div class="flex mb-3 sm:mb-0">
      <button
        class="w-fit px-3 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-emerald-400 bg-emerald-400 text-white text-xs sm:text-sm font-semibold"
        @click="handleSortByTitle"
      >
        Title
      </button>
      <button
        class="w-fit px-2 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-black bg-black text-white text-xs sm:text-sm font-semibold"
      >
        Description
      </button>
      <button
        class="w-fit px-3 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        @click="handleSortByPriority"
      >
        Priority
      </button>
      <button
        class="w-fit px-3 sm:px-4 h-8 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        @click="handleSortByDate"
      >
        Date
      </button>
    </div>
    <div class="flex">
      <button
        class="sm:w-8 sm:h-8 bg-emerald-400 rounded-lg flex items-center justify-center w-8 h-8 m-1"
      >
        <UpArrow class="w-4 h-4 sm:w-6 sm:h-auto" />
      </button>
      <button
        class="sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center w-8 h-8 m-1"
      >
        <DownArrow class="w-4 h-4 sm:w-6 sm:h-auto" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UpArrow from './icons/UpArrow.vue';
import DownArrow from './icons/DownArrow.vue';

const emit = defineEmits([
  'handleSortByTitle',
  'handleSortByDate',
  'handleSortByPriority',
]);

function handleSortByTitle() {
  emit('handleSortByTitle');
}

function handleSortByDate() {
  emit('handleSortByDate');
}

function handleSortByPriority() {
  emit('handleSortByPriority');
}
</script>
