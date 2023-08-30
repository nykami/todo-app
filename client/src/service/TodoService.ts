import { Todo } from '../components/types/Todo.vue';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const baseUrl = import.meta.env.VITE_BASE_URL;

class TodoService {
  todos: Todo[] = [];

  async getAllTodos(userId: string) {
    try {
      const todoData = await getRequest(`${baseUrl}/todos/${userId}`);
      this.todos = todoData.map((todo: Todo) => {
        return {
          ...todo,
          date: new Date(todo.date),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(userId: string) {
    try {
      const todo = await postRequest(`${baseUrl}/todos/new/${userId}`, {});
      todo.date = new Date(todo.date);      
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await deleteRequest(`${baseUrl}/todos/delete/${todoId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(todoId: string, updatedTodo: Todo) {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedTodo.title,
          description: updatedTodo.description,
          priority: updatedTodo.priority,
          date: updatedTodo.date,
          isEditing: updatedTodo.isEditing,
        }),
      };
      await putRequest(`${baseUrl}/todos/update/${todoId}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoService;
