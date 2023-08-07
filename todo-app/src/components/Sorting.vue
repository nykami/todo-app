<template>
  <div
    class="flex sm:flex-row flex-col justify-between sm:items-center items-start w-72 h-12 sm:w-full sm:h-full"
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
import UpArrow from './icons/UpArrow.vue';
import DownArrow from './icons/DownArrow.vue';

interface Props {
  sortType: string;
  sortByField: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['handleSort', 'toggleSortType']);

function handleClick(sortBy: string) {
  emit('handleSort', sortBy);
}

function toggleSortType(sortType: string) {
  emit('toggleSortType', sortType);
}

function getColorBySortType(sortByField: string) {
  if (props.sortType === 'asc' && props.sortByField === sortByField)
    return 'border-emerald-400 bg-emerald-400 text-white';
  else if (props.sortType === 'desc' && props.sortByField === sortByField)
    return 'border-black bg-black text-white';
  else return '';
}
</script>
