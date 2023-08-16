<template>
  <div
    class="mb-10 flex h-12 w-72 flex-col items-start justify-between sm:h-full sm:w-40rem sm:flex-row sm:items-center"
  >
    <div class="mb-3 flex sm:mb-0">
      <button
        class="mr-2 h-8 w-fit rounded-lg border border-black px-3 text-xs font-semibold sm:mr-3 sm:px-4 sm:text-sm"
        :class="getColorBySortType('title')"
        @click="handleClick('title')"
      >
        Title
      </button>
      <button
        class="mr-2 h-8 w-fit rounded-lg border border-black px-2 text-xs font-semibold sm:mr-3 sm:px-4 sm:text-sm"
        :class="getColorBySortType('description')"
        @click="handleClick('description')"
      >
        Description
      </button>
      <button
        class="mr-2 h-8 w-fit rounded-lg border border-black px-3 text-xs font-semibold sm:mr-3 sm:px-4 sm:text-sm"
        :class="getColorBySortType('importance')"
        @click="handleClick('importance')"
      >
        Priority
      </button>
      <button
        class="h-8 w-fit rounded-lg border border-black px-3 text-xs font-semibold sm:px-4 sm:text-sm"
        :class="getColorBySortType('date')"
        @click="handleClick('date')"
      >
        Date
      </button>
    </div>
    <div class="flex">
      <button
        class="m-1 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 sm:h-8 sm:w-8"
        @click="toggleSortType('asc')"
      >
        <UpArrow class="h-4 w-4 sm:h-auto sm:w-6" />
      </button>
      <button
        class="m-1 flex h-8 w-8 items-center justify-center rounded-lg bg-black sm:h-8 sm:w-8"
        @click="toggleSortType('desc')"
      >
        <DownArrow class="h-4 w-4 sm:h-auto sm:w-6" />
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
