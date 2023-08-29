<template>
  <div class="flex flex-col items-center">
    <ul class="h-12 w-72 sm:h-full sm:w-full">
      <li
        class="mb-4 flex transform flex-col justify-center rounded-lg border border-black p-4 text-center duration-300 ease-out hover:scale-105 sm:mb-10"
        v-for="(todo, _id) in reversedTodos"
        :key="_id"
      >
        <TodoItem
          v-if="!todo.isEditing"
          :todo="todo"
          @setIsEditingTrue="setEditState(todo._id, true)"
          @handleCheckboxClick="handleCheckboxClick(todo._id)"
        />
        <TodoItemEdit
          v-else
          :todo="todo"
          @handleDeleteButtonClick="deleteTodo(todo._id)"
          @handleSaveButtonClick="saveChanges"
          @setIsEditingFalse="setEditState(todo._id, false)"
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

function deleteTodo(todoId: string) {
  emit('deleteTodo', todoId);
}

function saveChanges(editedTodo: Todo, todoId: number) {  
  emit('updateTodo', editedTodo, todoId);
}

function setEditState(todoId: string, value: boolean) {
  emit('setEditState', todoId, value);
}

function handleCheckboxClick(todoId: string) {
  emit('handleCheckboxClick', todoId);
}
</script>
