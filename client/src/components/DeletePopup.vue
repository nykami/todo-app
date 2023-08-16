<template>
  <Transition
    name="modal"
    enter-active-class="transition-all duration-300 ease transform scale-100 opacity-100"
    leave-active-class="transition-all duration-200 ease-in transform scale-100 opacity-0"
  >
    <div
      v-if="isShowingPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div>
        <div
          class="modal-container flex w-48 flex-col justify-between rounded-lg bg-white p-5 shadow-2xl sm:h-40 sm:w-80"
        >
          <div class="modal-body mb-4 text-sm text-gray-700 sm:text-lg">
            Are you sure you want to delete this todo?
          </div>
          <div class="modal-footer">
            <div class="flex items-center justify-between">
              <Button
                class="bg-neutral-300 text-black"
                @click="handleCancerButtonClick"
                buttonText="Cancel"
              >
              </Button>
              <Button
                class="bg-orange-700 text-white"
                @click="handleDeleteButtonClick"
                buttonText="Delete"
              >
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Button from './base-components/Button.vue';

interface Props {
  isShowingPopup: Boolean;
}
defineProps<Props>();

const emit = defineEmits(['handlePopupButtonClick']);

function handleCancerButtonClick() {
  emit('handlePopupButtonClick', false);
}

function handleDeleteButtonClick() {
  emit('handlePopupButtonClick', true);
}
</script>
