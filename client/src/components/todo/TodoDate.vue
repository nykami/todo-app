<template>
  <div class="flex w-full items-center text-xs font-normal text-zinc-800">
    <DatePicker
      v-if="todoIsEditing"
      v-model="dateInput"
      @update:modelValue="dateSelected"
    />
    <div v-else class="flex">
      <CalendarIcon class="mr-1" />
      {{ todoDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from './DatePicker.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';

interface Props {
  todoDate: string;
  todoIsEditing: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['dateSelected']);

const dateParts = props.todoDate.split('.');
const day = parseInt(dateParts[0], 10);
const month = parseInt(dateParts[1], 10) - 1;
const year = parseInt(dateParts[2], 10);
const dateInput = ref(new Date(year, month, day));

function dateSelected(selectedDate: Date): void {
  emit('dateSelected', selectedDate);
}
</script>
