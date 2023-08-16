<template>
  <div class="flex w-full items-start sm:flex sm:w-full sm:items-start">
    <Button
      class="mr-2 border-emerald-200 bg-emerald-400 text-white sm:mr-4 sm:hover:bg-emerald-500"
      @click="handleSaveButtonClick"
      buttonText="Save"
    >
    </Button>
    <Button
      class="border-neutral-200 bg-neutral-200 text-black sm:hover:bg-neutral-300"
      @click="showPopup()"
      buttonText="Delete"
    >
    </Button>
    <DeletePopup
      :isShowingPopup="isShowingPopup"
      @handlePopupButtonClick="handlePopupButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeletePopup from '../DeletePopup.vue';
import Button from '../base-components/Button.vue';

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
