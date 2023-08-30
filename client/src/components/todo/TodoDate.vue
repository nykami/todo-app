<template>
  <div class="flex w-full items-center text-xs font-normal text-zinc-800">
    <DatePicker
      v-if="todoIsEditing"
      v-model="dateInput"
      @update:modelValue="dateSelected"
    />
    <div v-else class="flex">
      <CalendarIcon class="mr-1" />
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DatePicker from './DatePicker.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';

interface Props {
  todoDate: Date;
  todoIsEditing: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['dateSelected']);

const now = new Date();
const dateInput: Date = now;

function dateSelected(selectedDate: Date): void {
  emit('dateSelected', selectedDate);
}
const formattedDate = computed(() => {
  let dateStr = '';
  if (dateInput !== now) {
    dateStr = dateInput.toLocaleDateString().slice(0, 10);
  } else {
    dateStr = props.todoDate.toLocaleDateString().slice(0, 10);
  }
  const [day, month, year] = dateStr.split('/');
  return `${year}.${month}.${day}.`;
});
</script>
