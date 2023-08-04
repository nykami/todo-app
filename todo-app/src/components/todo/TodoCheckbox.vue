<template>
  <button class="relative" @click="handleCheckboxClick">
    <template v-if="todoIsChecked">
      <GreenEllipseIcon class="w-6 sm:w-10" />
      <GreenCheckIcon
        class="absolute bottom-1 sm:left-1 sm:bottom-2 w-6 sm:w-10"
      />
    </template>
    <BlackEllipseIcon v-else class="w-6 sm:w-10" />
  </button>
</template>

<script setup lang="ts">
import BlackEllipseIcon from "../icons/BlackEllipseIcon.vue";
import GreenCheckIcon from "../icons/GreenCheckIcon.vue";
import GreenEllipseIcon from "../icons/GreenEllipseIcon.vue";

interface Props {
  todoIsChecked: boolean;
}

defineProps<Props>();

const emit = defineEmits(['handleCheckboxClick']);

function handleCheckboxClick(event: Event) {
  event.stopPropagation();
  emit('handleCheckboxClick');
}
</script>
