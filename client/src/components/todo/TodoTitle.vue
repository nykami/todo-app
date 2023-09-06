<template>
  <p
    v-if="!todoIsEditing"
    class="break-all text-start text-lg font-semibold sm:my-2 sm:w-112 sm:text-4xl"
  >
    {{ computedTitle }}
  </p>
  <input
    v-else
    class="break-all text-start text-lg font-semibold focus:outline-none sm:my-2 sm:w-112 sm:text-4xl"
    v-model="computedTitle"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue: string;
  todoIsEditing: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const computedTitle = computed({
  get: () => value.value,
  set: (newValue: string) => {
    value.value = newValue;
    emit('update:modelValue', newValue);
  },
});
</script>
