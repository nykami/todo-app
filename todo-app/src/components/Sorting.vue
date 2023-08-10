<template>
  <div
    class="flex sm:flex-row flex-col justify-between sm:items-center items-start w-72 h-12 sm:w-full sm:h-full mb-10"
  >
    <div class="flex mb-3 sm:mb-0">
      <button
        class="w-fit px-3 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        :class="getColorBySortType('title')"
        @click="handleClick('title')"
      >
        Title
      </button>
      <button
        class="w-fit px-2 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        :class="getColorBySortType('description')"
        @click="handleClick('description')"
      >
        Description
      </button>
      <button
        class="w-fit px-3 sm:px-4 h-8 mr-2 sm:mr-3 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        :class="getColorBySortType('importance')"
        @click="handleClick('importance')"
      >
        Priority
      </button>
      <button
        class="w-fit px-3 sm:px-4 h-8 rounded-lg border border-black text-xs sm:text-sm font-semibold"
        :class="getColorBySortType('date')"
        @click="handleClick('date')"
      >
        Date
      </button>
    </div>
    <div class="flex">
      <button
        class="sm:w-8 sm:h-8 bg-emerald-400 rounded-lg flex items-center justify-center w-8 h-8 m-1"
        @click="toggleSortType('asc')"
      >
        <UpArrow class="w-4 h-4 sm:w-6 sm:h-auto" />
      </button>
      <button
        class="sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center w-8 h-8 m-1"
        @click="toggleSortType('desc')"
      >
        <DownArrow class="w-4 h-4 sm:w-6 sm:h-auto" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UpArrow from './icons/UpArrow.vue';
import DownArrow from './icons/DownArrow.vue';

interface Props {
  sortType: string;
  sortByField: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['handleSort', 'toggleSortType']);

const clickCounter = ref<{ [key: string]: number }>({
  title: 0,
  description: 0,
  importance: 0,
  date: 0,
});

function handleClick(sortBy: string) {
  clickCounter.value[sortBy]++;
  if (clickCounter.value[sortBy] % 2 === 1) {
    emit('handleSort', sortBy);
  } else {
    clickCounter.value[sortBy] = 0;
    emit('handleSort', '');
  }
}

function toggleSortType(sortType: string) {
  emit('toggleSortType', sortType);
}

function getColorBySortType(sortByField: string) {
  if (sortByField !== props.sortByField) return '';
  return props.sortType === 'asc'
    ? 'border-emerald-400 bg-emerald-400 text-white'
    : 'border-black bg-black text-white';
}
</script>
