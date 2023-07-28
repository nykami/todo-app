<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div>
      <TodoLogin />
      <TodoHeader @addTodo="addTodo" />
      <TodoPlaceholder v-if="!todos.length" />
      <TodoList
        v-else
        :todos="todos"
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
import { Todo } from "./types/Todo.vue";


const todos = ref<Todo[]>([]);
const idCounter = ref<number>(0);

function addTodo(defaultTodo: Todo) {
  defaultTodo.id = idCounter.value++;
  todos.value.push(defaultTodo);
}
</script>
