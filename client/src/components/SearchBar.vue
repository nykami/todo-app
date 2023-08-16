<template>
  <div
    class="mb-10 flex h-12 w-72 items-center justify-between rounded-xl border border-black p-4 sm:h-full sm:w-160"
  >
    <div class="flex items-center">
      <SearchIcon class="h-5 w-5 sm:h-6 sm:w-6" />
      <input
        v-model="searchText"
        type="text"
        class="ml-4 h-6 w-32 rounded-lg px-1 py-2 text-sm font-medium text-black sm:h-8 sm:w-full sm:text-lg sm:font-semibold"
        placeholder="Search todos..."
        @input="handleSearchInput"
      />
    </div>

    <button
      class="h-8 w-16 rounded-lg bg-black text-xs font-semibold text-white sm:ml-2 sm:h-8 sm:w-20 sm:px-4 sm:py-2 sm:hover:bg-gray-800"
      @click="handleSearchButtonClick"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
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
