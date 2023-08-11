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
          class="modal-container flex h-32 w-48 flex-col justify-between rounded-lg bg-white p-5 shadow-2xl sm:h-40 sm:w-80"
        >
          <div class="modal-body text-sm text-gray-700 sm:text-lg">
            Are you sure you want to delete this todo?
          </div>
          <div class="modal-footer">
            <div class="flex items-center justify-between">
              <button
                class="modal-default-button mt-2 rounded-md bg-neutral-300 px-3 py-1 text-xs font-semibold text-black sm:rounded-xl sm:px-4 sm:py-2 sm:text-lg"
                @click="handleCancerButtonClick"
              >
                Cancel
              </button>
              <button
                class="modal-default-button mt-2 rounded-md bg-orange-700 px-3 py-1 text-xs font-semibold text-white sm:rounded-xl sm:px-4 sm:py-2 sm:text-lg"
                @click="handleDeleteButtonClick"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
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
