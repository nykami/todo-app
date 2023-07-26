<template>
  <div class="flex items-center justify-between mb-12 w-[600px] h-[317px]">
    <div class="text-black text-7xl font-semibold">To do list</div>
    <button
      class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center"
      @click="addNewTodo"
    >
      <PlusIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from "./icons/PlusIcon.vue";

const emit = defineEmits(["addTodo"]);

function addNewTodo() {
  emit("addTodo", "Title");
}
</script>
