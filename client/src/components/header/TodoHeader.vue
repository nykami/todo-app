<template>
  <div class="flex w-72 items-center justify-between py-6 sm:w-160">
    <div class="text-2xl font-semibold text-black sm:text-7xl">To do list</div>
    <button
      class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 sm:h-14 sm:w-14 sm:hover:bg-emerald-500"
      @click="addNewTodo"
    >
      <PlusIcon class="h-4 w-4 sm:h-auto sm:w-7" />
    </button>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '../icons/PlusIcon.vue';

const emit = defineEmits(['addTodo']);

function addNewTodo() {
  emit('addTodo');
}
</script>
