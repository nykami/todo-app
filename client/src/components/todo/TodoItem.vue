<template>
  <div
    class="flex flex-row items-center justify-between sm:flex-col"
    @click="setIsEditingTrue"
  >
    <div class="flex flex-col">
      <div class="flex flex-row sm:w-152 sm:justify-between">
        <TodoTitle :todoTitle="todo.title" />
        <TodoImportance
          :todoImportance="todo.importance"
          :todoIsEditing="todo.isEditing"
        />
      </div>
      <TodoDate :todoDate="todo.date" :todoIsEditing="todo.isEditing" />
    </div>

    <div
      class="flex flex-col justify-between sm:mt-6 sm:w-full sm:flex-row sm:pt-6"
    >
      <TodoContent
        :todoContent="todo.content"
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
import TodoContent from './TodoContent.vue';
import TodoDate from './TodoDate.vue';
import TodoCheckbox from './TodoCheckbox.vue';
import TodoImportance from './TodoImportance.vue';
import { Todo } from '../types/Todo.vue';

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
