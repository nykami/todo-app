import { ref } from 'vue';
import { Todo } from '../components/types/Todo.vue';
import { User } from '../components/types/User.vue';
class TodoService {
  todos = ref<Todo[]>([]);
  user = ref<User>();

  async getAllTodos(userId: string) {
    try {
      const response = await fetch(`http://localhost:8080/todos/${userId}`);
      const todoData = await response.json();
      this.todos.value = todoData;
    } catch (error) {
      console.log(error);
    }
  }

  get() {
    return this.todos;
  }

  async addTodo(userId: string) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        `http://localhost:8080/todos/new/${userId}`,
        requestOptions,
      );

      if (!response.ok) {
        console.log('Failed to add todo');
      }
      await this.getAllTodos(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(todoId: string) {
    try {
      const requestOptions = {
        method: 'DELETE',
      };
      const response = await fetch(
        `http://localhost:8080/todos/delete/${todoId}`,
        requestOptions,
      );

      if (response.ok) {
        this.todos.value = this.todos.value.filter(
          (todo) => todo._id !== todoId,
        );
      } else {
        console.log(`Failed to delete todo with id: ${todoId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  fromStringToDate(dateStr: string) {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  formatDate(date: string) {
    const [day, month, year] = date.split('.').map(String);
  return `${year}.${month}.${day}`;
  }

  async updateTodo(todoId: string, updatedTodo: Todo) {
    try {
      const todoToUpdate = this.todos.value.find((todo) => todo._id === todoId);
      console.log('ToUPD: ', todoToUpdate?.date);
      console.log('UPD: ', updatedTodo.date);

      const newDate = this.fromStringToDate(updatedTodo.date);
      console.log('NEWDATE: ', newDate);

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedTodo.title,
          description: updatedTodo.description,
          priority: updatedTodo.priority,
          date: newDate,
          isEditing: updatedTodo.isEditing,
        }),
      };

      await fetch(
        `http://localhost:8080/todos/update/${todoId}`,
        requestOptions,
      );

      if (todoToUpdate) {
        todoToUpdate.title = updatedTodo.title;
        todoToUpdate.description = updatedTodo.description;
        todoToUpdate.priority = updatedTodo.priority;
        const formattedDate = this.formatDate(updatedTodo.date);
        todoToUpdate.date = formattedDate;
        todoToUpdate.isEditing = updatedTodo.isEditing;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoService;
