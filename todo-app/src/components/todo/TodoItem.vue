<template>
  <div
    class="flex flex-row sm:flex-col justify-between items-center"
    @click="setIsEditingTrue"
  >
    <div class="flex flex-col">
      <div class="flex flex-row sm:justify-between sm:w-38rem">
        <TodoTitle :todoTitle="todo.title" />
        <TodoImportance
          :todoImportance="todo.importance"
          :todoIsEditing="todo.isEditing"
        />
      </div>
      <TodoDate :todoDate="todo.date" />
    </div>

    <div
      class="flex flex-col sm:flex-row justify-between sm:pt-6 sm:mt-6 sm:w-full"
    >
      <TodoContent
        :todoContent="todo.content"
        :todoIsEditing="todo.isEditing"
      />
      <TodoCheckbox
        :todoIsChecked="todo.isChecked"
        @toggleTodoCheckedState="toggleTodoCheckedState"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoTitle from "./TodoTitle.vue";
import TodoContent from "./TodoContent.vue";
import TodoDate from "./TodoDate.vue";
import TodoCheckbox from "./TodoCheckbox.vue";
import TodoImportance from "./TodoImportance.vue";
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}
defineProps<Props>();

const emit = defineEmits(["setIsEditingTrue", "toggleTodoCheckedState"]);

function setIsEditingTrue() {
  emit("setIsEditingTrue");
}

function toggleTodoCheckedState() {
  emit("toggleTodoCheckedState");
}
</script>
