<template>
  <div
    class="w-2 h-2 ml-2 mt-3 sm:w-32 sm:h-10 rounded-full flex items-center justify-center border border-black"
  >
    <div
      class="sm:flex sm:flex-row hidden sm:items-center text-lg font-semibold text-black"
    >
      {{ todoImportance }}
      <OptionsIcon v-if="todoIsEditing" class="ml-2" />
    </div>
    <div class="sm:hidden flex ml-[6.5rem]">
      <div
        class="rounded-full w-2 h-2 -ml-6"
        v-for="(_, importance) in colorMap"
        :class="colorMap[importance]"
        @click="handleImportanceChangeClickMobile(importance as string)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorMap } from "../types/ColorMap.vue";
import OptionsIcon from "../icons/OptionsIcon.vue";

interface Props {
  todoImportance: string;
  todoIsEditing: boolean;
  colorMap: ColorMap;
}

const emit = defineEmits(["handleImportanceChangeClickMobile"]);

defineProps<Props>();

function handleImportanceChangeClickMobile(importance: string) {
  emit("handleImportanceChangeClickMobile", importance);
}
</script>
