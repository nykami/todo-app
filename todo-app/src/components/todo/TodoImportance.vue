<template>
  <div
    class="w-2 h-2 ml-2 mt-3 sm:w-32 sm:h-10 rounded-full flex items-center justify-center"
    :class="colorMap[todo.importance]"
  >
    <div
      class="sm:flex sm: items-center hidden text-lg font-semibold text-white"
    >
      {{ todo.importance }}
      <OptionsIcon v-if="todo.isEdited" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionsIcon from "../icons/OptionsIcon.vue";
import { Todo } from "../types/Todo.vue";
import { ColorMap } from "../types/ColorMap.vue";

interface Props {
  todo: Todo;
}

defineProps<Props>();

const colorMap: ColorMap = {
  High: "bg-orange-600 border-orange-600",
  Medium: "bg-amber-500 border-amber-500",
  Low: "bg-teal-400 border-teal-400",
};
</script>
