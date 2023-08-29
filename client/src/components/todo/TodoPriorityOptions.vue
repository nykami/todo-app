<template>
  <div
    class="ml-2 mt-2 sm:mt-3 flex h-2 w-2 items-center justify-center rounded-full sm:border sm:border-black sm:h-10 sm:w-32 relative"
  >
    <div
      class="hidden text-lg font-semibold text-black sm:flex sm:flex-row sm:items-center"
    >
      {{ todoPriority }}
      <OptionsIcon v-if="todoIsEditing" class="ml-2" />
    </div>
    <div class="flex sm:hidden absolute left-14">
      <div
        class="-ml-7 h-3 w-3 rounded-full mt-1"
        v-for="(_, importance) in colorMap"
        :class="colorMap[importance]"
        @click="handleImportanceChangeClickMobile(importance as string)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorMap } from '../types/ColorMap.vue';
import OptionsIcon from '../icons/OptionsIcon.vue';

interface Props {
  todoPriority: string;
  todoIsEditing: boolean;
  colorMap: ColorMap;
}

const emit = defineEmits(['handleImportanceChangeClickMobile']);

defineProps<Props>();

function handleImportanceChangeClickMobile(importance: string) {
  emit('handleImportanceChangeClickMobile', importance);
}
</script>
