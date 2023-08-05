<template>
  <div class="flex items-center w-full text-zinc-800 text-xs font-normal">
    <DatePicker
      v-if="todoIsEditing"
      v-model="dateinput"
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

defineProps<Props>();

const emit = defineEmits(['dateSelected']);
const dateinput = ref(new Date());

function dateSelected(payload: Date): void {
  dateinput.value = payload;
  emit('dateSelected', dateinput.value);
}
</script>
