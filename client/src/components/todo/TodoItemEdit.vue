<template>
  <div ref="todoEditRef">
    <div class="flex flex-row items-center justify-between sm:flex-col">
      <div class="flex flex-col">
        <div class="flex w-56 flex-row sm:w-152 sm:justify-between">
          <TodoTitle
            v-model="todo.title"
            :todoIsEditing="todo.isEditing"
          ></TodoTitle>
          <div class="flex flex-col">
            <TodoPriorityOptions
              v-if="isShowingOptions"
              :colorMap="colorMap"
              :todoPriority="todo.priority"
              :todoIsEditing="todo.isEditing"
              @handleImportanceChangeClickMobile="changeImportance"
            />
            <TodoPriority
              v-else
              :todoPriority="todo.priority"
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
        class="hidden w-152 items-start font-semibold sm:flex sm:justify-between sm:text-2xl"
      >
        <TodoDescription
          v-model="todo.description"
          :todoIsEditing="todo.isEditing"
        />
        <div
          v-if="isShowingOptions"
          class="ml-3 flex h-28 w-32 flex-col items-start justify-center rounded-xl border border-black pl-6"
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
      class="flex flex-col items-start font-semibold text-neutral-500 sm:hidden"
    >
      <TodoDescription
        v-model="todo.description"
        :todoIsEditing="todo.isEditing"
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
import TodoButtons from './TodoButtons.vue';
import TodoDate from './TodoDate.vue';
import { Todo } from '../types/Todo.vue';
import { ColorMap } from '../types/ColorMap.vue';
import TodoPriority from './TodoPriority.vue';
import TodoPriorityOptions from './TodoPriorityOptions.vue';
import TodoDescription from './TodoDescription.vue';

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
  'setIsEditingFalse',
]);

const todoEditRef = ref(null);

const editedTodo = reactive(props.todo);
const isShowingOptions = ref(false);

onClickOutside(todoEditRef, () => {
  emit('setIsEditingFalse');
});

function changeImportance(importance: string) {
  editedTodo.priority = importance;
  isShowingOptions.value = false;
}

function handleImportanceChangeClick(event: Event) {
  editedTodo.priority = (event.target as HTMLDivElement).innerText;
  isShowingOptions.value = false;
}

function toggleIsShowingOptions() {
  isShowingOptions.value = !isShowingOptions.value;
}

function handleSaveButtonClick() {
  emit('handleSaveButtonClick', editedTodo, props.todo._id);
}

function handleDeleteButtonClick() {
  emit('handleDeleteButtonClick', props.todo._id);
}

function changeDate(newDate: Date) {
  editedTodo.date = newDate;
}
</script>
