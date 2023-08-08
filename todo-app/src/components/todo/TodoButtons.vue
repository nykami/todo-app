<template>
  <div class="flex w-full items-start sm:w-full sm:flex sm:items-start">
    <button
      class="w-16 h-7 border border-emerald-200 sm:w-28 sm:h-12 font-semibold text-sm sm:text-lg bg-emerald-400 sm:hover:bg-emerald-500 rounded-lg sm:rounded-2xl flex items-center justify-center text-white mr-2 sm:mr-4"
      @click="handleSaveButtonClick"
    >
      Save
    </button>
    <button
      class="w-16 h-7 border border-neutral-200 sm:w-28 sm:h-12 font-semibold text-sm sm:text-lg bg-neutral-200 sm:hover:bg-neutral-300 rounded-lg sm:rounded-2xl flex items-center justify-center text-black"
      @click="showPopup()"
    >
      Delete
    </button>
    <DeletePopup
      :isShowingPopup="isShowingPopup"
      @handlePopupButtonClick="handlePopupButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeletePopup from '../DeletePopup.vue';

const emit = defineEmits(['handleSaveButtonClick', 'handleDeleteButtonClick']);

const isShowingPopup = ref<boolean>(false);

function handleSaveButtonClick() {
  emit('handleSaveButtonClick');
}

function showPopup() {
  isShowingPopup.value = true;
}

function handlePopupButtonClick(confirmDelete: boolean) {
  if (confirmDelete) {
    emit('handleDeleteButtonClick');
  }
  isShowingPopup.value = false;
}
</script>
