<template>
  <div ref="todoEditRef">
    <div class="flex flex-row sm:flex-col justify-between items-center">
      <div class="flex flex-col">
        <div class="flex flex-row sm:justify-between sm:w-38rem">
          <TodoTitle
            :contenteditable="isEditable"
            :todoTitle="todo.title"
            @handleTitleInputChange="changeTitle"
          ></TodoTitle>
          <div class="flex flex-col items-end">
            <TodoImportanceOptions
              v-if="isShowingOptions"
              :colorMap="colorMap"
              :todoImportance="todo.importance"
              :todoIsEditing="todo.isEditing"
              @handleImportanceChangeClickMobile="changeImportance"
            />
            <TodoImportance
              v-else
              :todoImportance="todo.importance"
              :todoIsEditing="todo.isEditing"
              @click="toggleIsShowingOptions"
            />
          </div>
        </div>
        <TodoDate
          :todoDate="todo.date"
          :todoIsEditing="todo.isEditing"
          @dateSelected="changeDate"
        />
      </div>
      <div
        class="hidden sm:text-2xl font-semibold w-38rem h-32 sm:flex sm:justify-between items-start"
      >
        <TodoContent
          :contenteditable="isEditable"
          :todoContent="todo.content"
          :todoIsEditing="todo.isEditing"
          @handleContentInputChange="changeContent"
        />
        <div
          v-if="isShowingOptions"
          class="border-black border rounded-xl w-32 h-28 flex flex-col justify-center items-start pl-6"
        >
          <div
            v-for="(_, levelOfImportance) in colorMap"
            @click="handleImportanceChangeClick"
          >
            <div class="text-lg font-semibold">
              {{ levelOfImportance }}
            </div>
          </div>
        </div>
      </div>
      <TodoButtons
        class="hidden sm:block"
        @handleDeleteButtonClick="handleDeleteButtonClick"
        @handleSaveButtonClick="handleSaveButtonClick"
      />
    </div>
    <div
      class="text-neutral-500 pt-4 flex flex-col sm:hidden font-semibold h-32 items-start"
    >
      <TodoContent
        :contenteditable="isEditable"
        :todoContent="todo.content"
        :todoIsEditing="todo.isEditing"
        @handleContentInputChange="changeContent"
      />
      <TodoButtons
        @handleDeleteButtonClick="handleDeleteButtonClick"
        @handleSaveButtonClick="handleSaveButtonClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import TodoTitle from './TodoTitle.vue';
import TodoContent from './TodoContent.vue';
import TodoImportance from '../todo/TodoImportance.vue';
import TodoImportanceOptions from './TodoImportanceOptions.vue';
import TodoButtons from './TodoButtons.vue';
import TodoDate from './TodoDate.vue';
import { Todo } from '../types/Todo.vue';
import { ColorMap } from '../types/ColorMap.vue';

const colorMap: ColorMap = {
  High: 'bg-orange-600 border-orange-600',
  Medium: 'bg-amber-500 border-amber-500',
  Low: 'bg-teal-400 border-teal-400',
};

interface Props {
  todo: Todo;
}
const props = defineProps<Props>();

const emit = defineEmits([
  'handleDeleteButtonClick',
  'handleSaveButtonClick',
  'toggleIsEditing',
]);

const todoEditRef = ref(null);

const isEditable = ref(props.todo.isEditing);
const editedTodo = reactive(props.todo);
const isShowingOptions = ref(false);

onClickOutside(todoEditRef, () => {
  emit('toggleIsEditing');
});

function changeTitle(newTitle: string) {
  editedTodo.title = newTitle;
}

function changeContent(newContent: string) {
  editedTodo.content = newContent;
}

function changeImportance(importance: string) {
  editedTodo.importance = importance;
  isShowingOptions.value = false;
}

function handleImportanceChangeClick(event: Event) {
  editedTodo.importance = (event.target as HTMLDivElement).innerText;
  isShowingOptions.value = false;
}

function toggleIsShowingOptions() {
  isShowingOptions.value = !isShowingOptions.value;
}

function handleSaveButtonClick() {
  emit('handleSaveButtonClick', editedTodo, props.todo.id);
}

function handleDeleteButtonClick() {
  emit('handleDeleteButtonClick', props.todo.id);
}

function changeDate(newDate: Date) {
  editedTodo.date = formattedDate(newDate);
}

function formattedDate(date: Date) {
  return date.toLocaleDateString('en-GB').replace(/\//g, '.');
}
</script>
