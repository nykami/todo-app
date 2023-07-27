<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <TodoLogin />
      <TodoHeader @addTodo="addTodo" />
      <TodoPlaceholder v-if="!todos.length" />
      <TodoList
        v-else
        :todos="todos"
        @removeTodo="removeTodo"
        @clearTodos="clearTodos"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoPlaceholder from "./components/TodoPlaceholder.vue";
import TodoLogin from "./components/TodoLogin.vue";
import { Todo } from "./types/ITodoItem.vue";

const todos = ref<Todo[]>([]);
const idCounter = ref<number>(0);

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearTodos() {
  todos.value = [];
}

function addTodo(defaultTodo: Todo) {
  defaultTodo.id = idCounter.value++;
  todos.value.push(defaultTodo);
}
</script>
