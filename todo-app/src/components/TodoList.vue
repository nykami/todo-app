<template>
  <div class="flex flex-col items-center h-screen">
    <ul class="w-72 h-12 sm:w-full sm:h-full">
      <li
        class="flex flex-col text-center border border-black p-4 rounded-lg mb-4 sm:mb-10"
        v-for="(todo, index) in reversedTodos"
        :key="index"
      >
        <TodoItem v-if="!todo.isEdited" :todo="todo" :index="index" />
        <TodoItemEdit
          v-else
          :todo="todo"
          :index="index"
          @removeTodo="removeTodo(todo)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TodoItem from "./todo/TodoItem.vue";
import TodoItemEdit from "./TodoItemEdit.vue";
import { Todo } from "./types/Todo.vue";

interface Props {
  todos: Todo[];
}
const props = defineProps<Props>();

const reversedTodos = computed(() => {
  return props.todos.slice().reverse();
});

function removeTodo(todo: Todo) {
  const indexToRemoveFrom = props.todos.indexOf(todo);
  props.todos.splice(indexToRemoveFrom, 1);
}
</script>
