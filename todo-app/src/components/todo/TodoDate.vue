<template>
  <div
    class="flex items-center w-full text-zinc-800 text-xs font-normal sm:ml-2"
  >
    <CalendarIcon class="mr-1 sm:hidden block" />
    {{ todoDate }}
  </div>
</template>

<script setup lang='ts'>
import CalendarIcon from '../icons/CalendarIcon.vue';

interface Props {
  todoDate: string;
}

defineProps<Props>();
</script>
