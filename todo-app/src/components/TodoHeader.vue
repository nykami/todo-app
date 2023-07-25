<template>
  <div class="container text-center">
    <div class="flex items-center mb-8 justify-center mr-8 space-x-20">
      <div class="text-black text-7xl font-semibold mb-8">To do list</div>
      <button
        class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center ml-4"
        @click="addNewTodo"
      >
      <AddTodoSvg/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddTodoSvg from './svgs/AddTodoSvg.vue'

const emit = defineEmits(["addTodo"]);

function addNewTodo() {
  emit("addTodo", "New Task");
}
</script>
