<template>
  <button class="relative" @click.stop="handleCheckboxClick">
    <template v-if="todo.isChecked">
      <GreenEllipseIcon class="w-6 sm:w-10" />
      <GreenCheckIcon
        class="absolute bottom-1 sm:left-1 sm:bottom-2 w-6 sm:w-10"
      />
    </template>
    <BlackEllipseIcon v-else class="w-6 sm:w-10" />
  </button>
</template>

<script setup lang="ts">
import BlackEllipseIcon from "../icons/BlackEllipseIcon.vue";
import GreenCheckIcon from "../icons/GreenCheckIcon.vue";
import GreenEllipseIcon from "../icons/GreenEllipseIcon.vue";
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();

function handleCheckboxClick(event: Event) {
  event.stopPropagation();
  toggleTodoCheckedState(props.todo);
}

function toggleTodoCheckedState(todo: Todo) {
  todo.isChecked = !todo.isChecked;
}
</script>
