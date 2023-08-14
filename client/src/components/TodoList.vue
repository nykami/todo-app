<template>
  <div class="flex flex-col items-center">
    <ul class="h-12 w-72 sm:h-full sm:w-full">
      <li
        class="mb-4 flex transform flex-col rounded-lg border border-black p-4 text-center duration-300 ease-out hover:scale-105 sm:mb-10"
        v-for="(todo, id) in reversedTodos"
        :key="id"
      >
        <TodoItem
          v-if="!todo.isEditing"
          :todo="todo"
          @setIsEditingTrue="setEditState(todo.id, true)"
          @handleCheckboxClick="handleCheckboxClick(todo.id)"
        />
        <TodoItemEdit
          v-else
          :todo="todo"
          @handleDeleteButtonClick="deleteTodo"
          @handleSaveButtonClick="saveChanges"
          @setIsEditingFalse="setEditState(todo.id, false)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TodoItem from './todo/TodoItem.vue';
import TodoItemEdit from './todo/TodoItemEdit.vue';
import { Todo } from './types/Todo.vue';

interface Props {
  reversedTodos: Todo[];
}
defineProps<Props>();

const emit = defineEmits([
  'deleteTodo',
  'updateTodo',
  'setEditState',
  'handleCheckboxClick',
]);

function deleteTodo(todoId: number) {
  emit('deleteTodo', todoId);
}

function saveChanges(editedTodo: Todo, todoId: number) {
  emit('updateTodo', editedTodo, todoId);
}

function setEditState(todoId: number, value: boolean) {
  emit('setEditState', todoId, value);
}

function handleCheckboxClick(todoId: number) {
  emit('handleCheckboxClick', todoId);
}
</script>
