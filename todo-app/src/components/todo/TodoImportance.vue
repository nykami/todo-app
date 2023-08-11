<template>
  <div
    class="ml-2 mt-3 flex h-2 w-2 items-center justify-center rounded-full sm:h-10 sm:w-32"
    :class="colorMap[todoImportance]"
  >
    <div
      class="sm: hidden items-center text-lg font-semibold text-white sm:flex"
    >
      {{ todoImportance }}
      <OptionsIcon v-if="todoIsEditing" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionsIcon from '../icons/OptionsIcon.vue';
import { ColorMap } from '../types/ColorMap.vue';

interface Props {
  todoImportance: string;
  todoIsEditing: boolean;
}

defineProps<Props>();

const colorMap: ColorMap = {
  High: 'bg-orange-600 border-orange-600 sm:hover:bg-orange-700',
  Medium: 'bg-amber-500 border-amber-500 sm:hover:bg-amber-600',
  Low: 'bg-teal-400 border-teal-400 sm:hover:bg-teal-500',
};
</script>
