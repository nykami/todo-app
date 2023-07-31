<template>
  <div>
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
          <div class="flex flex-col items-end">
            <div
              v-if="showOptions"
              class="w-2 h-2 ml-2 mt-3 sm:w-32 sm:h-10 rounded-full flex items-center justify-center border border-black"
            >
              <div
                class="sm:flex sm:flex-row hidden sm:items-center text-lg font-semibold text-black"
              >
                {{ todo.importance }}
                <OptionsIcon v-if="todo.isEdited" class="ml-2" />
              </div>
              <div class="sm:hidden flex ml-[6.5rem]">
                  <div
                    class="rounded-full w-2 h-2 -ml-6"
                    v-for="(_, importance) in colorMap"
                    :class="colorMap[importance]"
                    @click="handleImportanceChangeClickMobile(importance as string)"
                  ></div>
              </div>
            </div>
            <TodoImportance
              v-else
              :todo="todo"
              @click="showOptions = !showOptions"
            />
          </div>
        </div>
        <div class="flex items-center w-full text-zinc-800 text-xs font-normal">
          <CalendarIcon class="mr-1 block sm:hidden" />
          {{ todo.date }}
        </div>
      </div>
      <div
        class="hidden sm:text-2xl font-semibold w-38rem h-[8rem] sm:flex sm:justify-between items-start"
      >
        <div
          class="text-black w-[28rem] sm:h-28 text-start "
          :contenteditable="isEditable"
          @input="handleContentInputChange"
        >
          {{ todo.content }}
        </div>
        <div
          v-if="showOptions"
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
      <div class="hidden sm:w-full sm:flex sm:items-start">
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
    <div
      class="text-neutral-500 pt-4 flex flex-col sm:hidden font-semibold h-32 items-start"
    >
      <div
        class="h-32 w-64 text-left"
        :contenteditable="isEditable"
        @input="handleContentInputChange"
      >
        {{ todo.content }}
      </div>
      <div class="flex w-full items-start">
        <button
          class="w-16 h-7 border border-emerald-200 font-semibold text-sm bg-emerald-400 rounded-lg flex items-center justify-center text-white mr-2"
          @click="handleSaveButtonClick"
        >
          Save
        </button>
        <button
          class="w-16 h-7 border border-neutral-200 font-semibold text-sm bg-neutral-200 rounded-lg flex items-center justify-center text-black"
          @click="handleDeleteButtonClick(todo.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoImportance from "./todo/TodoImportance.vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import OptionsIcon from "./icons/OptionsIcon.vue";
import { ColorMap } from "./types/ColorMap.vue";
import { Todo } from "./types/Todo.vue";

interface Props {
  todo: Todo;
}
const props = defineProps<Props>();
const emit = defineEmits(["removeTodo"]);

const isEditable = ref(props.todo.isEdited);
const editedTodo = props.todo;
let showOptions = ref<boolean>(false);

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
  props.todo.importance = editedTodo.importance;
  props.todo.isEdited = false;
}

function handleImportanceChangeClickMobile(importance: string){
  editedTodo.importance = importance
  showOptions.value = false;
}

function handleImportanceChangeClick(event: Event) {
  editedTodo.importance = (event.target as HTMLDivElement).innerText;
  showOptions.value = false;
}

function handleDeleteButtonClick(todoId: number) {
  emit("removeTodo", todoId);
}
</script>
