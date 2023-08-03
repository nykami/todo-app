<template>
  <div class="flex w-full items-start sm:w-full sm:flex sm:items-start">
    <button
      class="w-16 h-7 border border-emerald-200 sm:w-28 sm:h-12 font-semibold text-sm sm:text-lg bg-emerald-400 rounded-lg sm:rounded-2xl flex items-center justify-center text-white mr-2 sm:mr-4"
      @click="handleSaveButtonClick"
    >
      Save
    </button>
    <button
      class="w-16 h-7 border border-neutral-200 sm:w-28 sm:h-12 font-semibold text-sm sm:text-lg bg-neutral-200 rounded-lg sm:rounded-2xl flex items-center justify-center text-black"
      @click="handleDeleteButtonClick"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["handleSaveButtonClick", "handleDeleteButtonClick"]);

function handleSaveButtonClick() {
  emit("handleSaveButtonClick");
}

function handleDeleteButtonClick() {
  if (confirm("Are you sure you want to delete this todo?")) {
    emit("handleDeleteButtonClick");
  }
}
</script>
