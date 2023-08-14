<template>
  <div class="flex w-full items-start sm:flex sm:w-full sm:items-start">
    <button
      class="mr-2 flex h-7 w-16 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-400 text-sm font-semibold text-white sm:mr-4 sm:h-12 sm:w-28 sm:rounded-2xl sm:text-lg sm:hover:bg-emerald-500"
      @click="handleSaveButtonClick"
    >
      Save
    </button>
    <button
      class="flex h-7 w-16 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-200 text-sm font-semibold text-black sm:h-12 sm:w-28 sm:rounded-2xl sm:text-lg sm:hover:bg-neutral-300"
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
