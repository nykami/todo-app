<template>
  <input type="date" :value="formattedDate" @input="onDateInput" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: Date,
});

const emit = defineEmits();

const dateValue = ref(props.modelValue);

function onDateInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const selectedDate = new Date(inputElement.value);
  dateValue.value = selectedDate;
  emit('update:modelValue', selectedDate);
}

const formattedDate = computed(() => {
  return dayjs(dateValue.value).format('YYYY-MM-DD');
});
</script>
