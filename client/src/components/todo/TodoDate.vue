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
import { computed, ref } from 'vue';
import DatePicker from './DatePicker.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';

interface Props {
  todoDate: Date;
  todoIsEditing: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['dateSelected']);

const dateInput = ref(props.todoDate);

function dateSelected(selectedDate: Date): void {
  emit('dateSelected', selectedDate);
}
const formattedDate = computed(() => {
  if (dateInput.value) {
    return dateInput.value.toISOString().slice(0, 10).replace(/\-/g, '.');
  }
  return '';
});
</script>
