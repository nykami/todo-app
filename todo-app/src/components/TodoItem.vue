<template>
  <div class="flex flex-row sm:flex-col justify-between items-center">
    <div class="flex flex-row sm:justify-between sm:w-[36rem]">
      <div class="font-semibold text-lg sm:text-4xl ">
        {{ todo.title }}
      </div>
      <div
        class="w-2 h-2 ml-2 mt-3 sm:w-32 sm:h-10 rounded-full flex items-center justify-center"
        :class="getColor()"
      >
        <div class="hidden sm:block text-lg font-semibold text-white">
          {{ todo.importance }}
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between sm:pt-6 sm:mt-6  sm:w-[36rem]">
      <div class="text-neutral-500 hidden sm:block sm:text-2xl font-semibold">
        {{ todo.content }}
      </div>
      <button class="relative " @click="handleCheckClick">
        <GreenEllipseIcon class="w-6 sm:w-10" v-if="checked" />
        <GreenCheckIcon class="absolute bottom-1 sm:left-1 sm:bottom-2 w-6 sm:w-10" v-if="checked" />
        <BlackEllipseIcon class="w-6 sm:w-10" v-if="!checked" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GreenCheckIcon from "./icons/GreenCheckIcon.vue";
import GreenEllipseIcon from "./icons/GreenEllipseIcon.vue";
import BlackEllipseIcon from "./icons/BlackEllipseIcon.vue";

const { todo } = defineProps(["todo", "index"]);
const checked = ref<boolean>(false);
function getColor() {
  switch (todo.importance) {
    case "High":
      return "bg-orange-600 border-orange-600";
    case "Medium":
      return "bg-amber-500 border-amber-500";
    case "Low":
      return "bg-teal-400 border-teal-400";
  }
}

function handleCheckClick() {
  checked.value = !checked.value;
}
</script>
