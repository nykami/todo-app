<template>
  <div
    class="flex items-center justify-between border border-black p-4 rounded-xl mb-10 w-72 h-12 sm:w-full sm:h-full"
  >
    <div class="flex items-center">
      <SearchIcon class="w-5 h-5 sm:w-6 sm:h-6" />
      <input
        v-model="searchText"
        type="text"
        class="rounded-lg text-sm font-medium sm:text-lg sm:font-semibold text-black ml-4 py-2 px-1 w-32 h-6 sm:h-8 sm:w-full"
        placeholder="Search todos..."
        @input="handleSearchInput"
      />
    </div>

    <button
      class="sm:ml-2 sm:px-4 sm:py-2 bg-black text-white text-xs rounded-lg w-16 h-8 sm:w-20 sm:h-8 items-center font-semibold"
      @click="handleSearchButtonClick"
    >
      Search
    </button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import SearchIcon from './icons/SearchIcon.vue';

const searchText = ref<string>('');

const emit = defineEmits(['filterTodos']);

function handleSearchInput(event: Event) {
  searchText.value = (event.target as HTMLInputElement).value;
}

function handleSearchButtonClick() {
  emit('filterTodos', searchText.value);
}
</script>
