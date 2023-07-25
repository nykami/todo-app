<template>
  <div class="container text-center">
    <div class="flex items-center mb-8 justify-center mr-8 space-x-20">
      <div class="text-black text-7xl font-semibold mb-8">To do list</div>
      <button
        class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center ml-4"
        @click="addNewTodo"
      >
        <svg class="w-7 h-7 text-white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.0013 5.08246H13.3607C13.2149 5.08246 13.142 5.15538 13.142 5.30121V13.8871H4.99353C4.8477 13.8871 4.77478 13.9601 4.77478 14.1059V15.7465C4.77478 15.8924 4.8477 15.9653 4.99353 15.9653H13.142V24.5512C13.142 24.697 13.2149 24.77 13.3607 24.77H15.0013C15.1472 24.77 15.2201 24.697 15.2201 24.5512V15.9653H23.3685C23.5144 15.9653 23.5873 15.8924 23.5873 15.7465V14.1059C23.5873 13.9601 23.5144 13.8871 23.3685 13.8871H15.2201V5.30121C15.2201 5.15538 15.1472 5.08246 15.0013 5.08246Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["addTodo"]);

function addNewTodo() {
  emit("addTodo", "New Task");
}
</script>
