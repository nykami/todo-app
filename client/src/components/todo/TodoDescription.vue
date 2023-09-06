<template>
  <p
    v-if="!todoIsEditing"
    class="fit my-2 hidden break-all text-start font-semibold text-neutral-500 sm:block sm:w-112 sm:text-2xl"
  >
    {{ computedDescription }}
  </p>
  <textarea
    v-else
    class="fit my-2 w-64 text-start text-black focus:outline-none sm:block sm:w-112"
    v-model="computedDescription"
  ></textarea>
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

const computedDescription = computed({
  get: () => value.value,
  set: (newValue: string) => {
    value.value = newValue;
    emit('update:modelValue', newValue);
  },
});
</script>

<style>
[contenteditable] {
  outline: 0px solid transparent;
}
</style>
