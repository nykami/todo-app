<template>
  <div class="flex flex-col items-center h-screen">
    <ul class="w-72 h-12 sm:w-full sm:h-full">
      <li
        class="flex flex-col text-center border border-black p-4 rounded-lg mb-4 sm:mb-10"
        v-for="(todo, id) in reversedTodos"
        :key="id"
      >
        <TodoItem
          v-if="!todo.isEditing"
          :todo="todo"
          @setIsEditingTrue="setIsEditingTrue(todo)"
          @handleCheckboxClick="handleCheckboxClick(todo.id)"
        />
        <TodoItemEdit
          v-else
          :todo="todo"
          @handleDeleteButtonClick="deleteTodo"
          @handleSaveButtonClick="saveChanges"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import TodoItem from './todo/TodoItem.vue';
import TodoItemEdit from './todo/TodoItemEdit.vue';
import { Todo } from './types/Todo.vue';

interface Props {
  reversedTodos: Todo[];
}
defineProps<Props>();

const emit = defineEmits(['deleteTodo', 'updateTodo', 'setIsEditingTrue', 'handleCheckboxClick']);

function deleteTodo(todoId: number) {
  emit('deleteTodo', todoId);
}

function saveChanges(editedTodo: Todo, todoId: number) {
  emit('updateTodo', editedTodo, todoId);
}

function setIsEditingTrue(todo: Todo) {
  emit('setIsEditingTrue', todo.id);
}

function handleCheckboxClick(todoId: number){
  emit('handleCheckboxClick', todoId);
}
</script>
