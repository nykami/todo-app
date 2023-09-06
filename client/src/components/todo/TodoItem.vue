<template>
  <div
    class="flex flex-row items-center justify-between sm:flex-col"
    @click="setIsEditingTrue"
  >
    <div class="flex flex-col">
      <div class="flex flex-row w-56 sm:w-152 sm:justify-between">
        <TodoTitle :todoTitle="todo.title" />
        <TodoPriority
          :todoPriority="todo.priority"
          :todoIsEditing="todo.isEditing"
        />
      </div>
      <TodoDate :todoDate="todo.date" :todoIsEditing="todo.isEditing" />
    </div>

    <div
      class="flex flex-col justify-between items-end sm:w-full sm:flex-row sm:py-3"
    >
      <TodoDescription
        v-model="todo.description"
        :todoIsEditing="todo.isEditing"
      />
      <TodoCheckbox
        :todoIsChecked="todo.isChecked"
        @handleCheckboxClick="handleCheckboxClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoTitle from './TodoTitle.vue';
import TodoDate from './TodoDate.vue';
import TodoCheckbox from './TodoCheckbox.vue';
import TodoPriority from './TodoPriority.vue';
import { Todo } from '../types/Todo.vue';
import TodoDescription from './TodoDescription.vue';

interface Props {
  todo: Todo;
}

defineProps<Props>();

const emit = defineEmits(['setIsEditingTrue', 'handleCheckboxClick']);

function setIsEditingTrue() {
  emit('setIsEditingTrue');
}

function handleCheckboxClick() {
  emit('handleCheckboxClick');
}
</script>
