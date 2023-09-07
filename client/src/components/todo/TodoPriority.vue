<template>
  <div
    class="ml-1 mt-2 sm:mt-3 h-3 w-3 items-center justify-center rounded-full p-1 sm:ml-0 sm:flex sm:h-10 sm:w-32"
    :class="colorMap[todoPriority]"
  >
    <div class="hidden items-center text-lg font-semibold text-white sm:flex">
      {{ todoPriority }}
      <OptionsIcon v-if="todoIsEditing" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionsIcon from '../icons/OptionsIcon.vue';
import { ColorMap } from '../types/ColorMap.vue';

interface Props {
  todoPriority: string;
  todoIsEditing: boolean;
}

defineProps<Props>();

const colorMap: ColorMap = {
  High: 'bg-orange-600 border-orange-600 sm:hover:bg-orange-700',
  Medium: 'bg-amber-500 border-amber-500 sm:hover:bg-amber-600',
  Low: 'bg-teal-400 border-teal-400 sm:hover:bg-teal-500',
};
</script>
