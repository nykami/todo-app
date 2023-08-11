<template>
  <Transition
    name="modal"
    enter-active-class="transition-all duration-300 ease transform scale-100 opacity-100"
    leave-active-class="transition-all duration-200 ease-in transform scale-100 opacity-0"
  >
    <div
      v-if="isShowingPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div>
        <div
          class="flex flex-col justify-between w-48 h-32 sm:w-80 sm:h-40 bg-white rounded-lg shadow-2xl p-5 modal-container"
        >
          <div class="text-sm sm:text-lg text-gray-700 modal-body">
            Are you sure you want to delete this todo?
          </div>
          <div class="modal-footer">
            <div class="flex items-center justify-between">
              <button
                class="modal-default-button bg-neutral-300 text-black py-1 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-xl font-semibold text-xs sm:text-lg mt-2"
                @click="handleCancerButtonClick"
              >
                Cancel
              </button>
              <button
                class="modal-default-button bg-orange-700 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-xl font-semibold text-xs sm:text-lg mt-2"
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
