<template>
  <input type="date" :value="formattedDate" @input="onDateInput" />
</template>

<script setup lang="ts">
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
  const date = dateValue.value?.toLocaleDateString('en-GB');
  const year = date?.split('/')[2];
  const month = date?.split('/')[1];
  const day = date?.split('/')[0];
  return `${year}-${month}-${day}`;
});
</script>
