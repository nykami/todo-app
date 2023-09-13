<template>
  <input
    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  inputType: string;
  inputPlaceholder: string;
}

defineProps<Props>();

const emit = defineEmits();

const handleInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit('update:modelValue', inputValue);
};
</script>
