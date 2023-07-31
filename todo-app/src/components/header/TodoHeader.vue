<template>
  <div
    class="flex items-center justify-between py-6 sm:w-[40rem] w-72"
  >
    <div class="text-black sm:text-7xl text-2xl font-semibold ">
      To do list
    </div>
    <button
      class="sm:w-14 sm:h-14 bg-emerald-400 rounded-full flex items-center justify-center w-8 h-8"
      @click="addNewTodo"
    >
      <PlusIcon class=" w-4 h-4 sm:w-7 sm:h-auto"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from "../icons/PlusIcon.vue";

const emit = defineEmits(["addTodo"]);

function addNewTodo() {
  const defaultTodo = {
    title: "Title",
    content: "Description",
    importance: "Medium",
    date: new Date().toLocaleDateString(),
    isEdited: false,
  };
  emit("addTodo", defaultTodo);
}
</script>
