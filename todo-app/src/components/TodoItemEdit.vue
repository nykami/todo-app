<template>
  <div class="flex flex-row sm:flex-col justify-between items-center">
    <div class="flex flex-col">
      <div class="flex flex-row sm:justify-between sm:w-38rem">
        <div
          class="font-semibold text-lg sm:text-4xl"
          :contenteditable="isEditable"
          @input="handleTitleInputChange"
        >
          {{ todo.title }}
        </div>
        <div
          class="w-2 h-2 ml-2 mt-3 sm:w-32 sm:h-10 rounded-full flex items-center justify-center"
          :class="colorMap[todo.importance]"
        >
          <div class="hidden sm:block text-lg font-semibold text-white">
            {{ todo.importance }}
          </div>
        </div>
      </div>
      <div class="flex items-center w-full text-zinc-800 text-xs font-normal">
        <CalendarIcon class="mr-1 hidden sm:block" />
        {{ todo.date }}
      </div>
    </div>

    <div
      class="text-neutral-500 hidden sm:text-2xl font-semibold w-[38rem] h-[8rem] sm:flex items-start"
      :contenteditable="isEditable"
      @input="handleContentInputChange"
    >
      {{ todo.content }}
    </div>
    <div class="w-full flex items-start">
      <button
        class="w-12 h-12 border border-emerald-200 sm:w-28 sm:h-12 font-semibold sm:text-lg sm:bg-emerald-400 rounded-2xl flex items-center justify-center text-white mr-4"
        @click="handleSaveButtonClick"
      >
        Save
      </button>
      <button
        class="w-12 h-12 border border-neutral-200 sm:w-28 sm:h-12 font-semibold sm:text-lg sm:bg-neutral-200 rounded-2xl flex items-center justify-center"
        @click="handleDeleteButtonClick(todo.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ColorMap } from "../types/ColorMap.vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import { Todo } from "../types/Todo.vue";

interface Props {
  todo: Todo;
}
const props = defineProps<Props>();
const isEditable = ref(props.todo.isEdited);
const editedTodo = props.todo;

const colorMap: ColorMap = {
  High: "bg-orange-600 border-orange-600",
  Medium: "bg-amber-500 border-amber-500",
  Low: "bg-teal-400 border-teal-400",
};

function handleTitleInputChange(event: Event) {
  editedTodo.title = (event.target as HTMLDivElement).innerText;
}

function handleContentInputChange(event: Event) {
  editedTodo.content = (event.target as HTMLDivElement).innerText;
}

function handleSaveButtonClick() {
  props.todo.title = editedTodo.title;
  props.todo.content = editedTodo.content;
  props.todo.isEdited = false;
}

const emit = defineEmits(["removeTodo"]);
function handleDeleteButtonClick(todoId: number) {
  emit("removeTodo", todoId);
}
</script>
