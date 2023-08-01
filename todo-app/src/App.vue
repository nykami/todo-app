<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div>
      <TodoLogin />
      <TodoHeader @addTodo="addTodo" />
      <TodoPlaceholder v-if="!todos.length" />
      <TodoList
        v-else
        :reversedTodos="reversedTodos"
        @deleteTodo="deleteTodo"
        @updateTodo="updateTodo"
        @setIsEditingTrue="setIsEditingTrue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TodoLogin from "./components/header/TodoLogin.vue";
import TodoHeader from "./components/header/TodoHeader.vue";
import TodoPlaceholder from "./components/TodoPlaceholder.vue";
import TodoList from "./components/TodoList.vue";
import { Todo } from "./components/types/Todo.vue";

const todos = ref<Todo[]>([]);

const reversedTodos = computed(() => {
  return todos.value.slice().reverse();
});

function findNextId(): number {
  let maxId = -1;
  todos.value.forEach((todo) => {
    if (todo.id > maxId) {
      maxId = todo.id;
    }
  });
  return maxId + 1;
}

function addTodo(defaultTodo: Todo) {
  defaultTodo.id = findNextId();
  todos.value.push(defaultTodo);
}

function deleteTodo(todoId: number) {
  const indexToRemoveFrom = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value.splice(indexToRemoveFrom, 1);
}

function updateTodo(newTodo: Todo, todoId: number) {
  const indexToUpdateAt = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value[indexToUpdateAt].content = newTodo.content;
  todos.value[indexToUpdateAt].title = newTodo.title;
  todos.value[indexToUpdateAt].importance = newTodo.importance;
  todos.value[indexToUpdateAt].isEditing = false;
}

function setIsEditingTrue(todoId: number){
  const indexToUpdateAt = todos.value.findIndex((obj) => obj.id === todoId);
  todos.value[indexToUpdateAt].isEditing = true;
}
</script>
