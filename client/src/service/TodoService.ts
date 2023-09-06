import { Todo } from '../components/types/Todo.vue';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const baseUrl = import.meta.env.VITE_BASE_URL;

class TodoService {
  async getTodos(userId: string) {
    try {
      const todoData = await getRequest(`${baseUrl}/user/todos/${userId}`);
      return todoData.map((todo: Todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(userId: string) {
    try {
      const todo = await postRequest(`${baseUrl}/user/todos/${userId}`, {});
      todo.date = new Date(todo.date);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await deleteRequest(`${baseUrl}/user/todos/${todoId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(todoId: string, updatedTodo: Todo) {
    try {
      const payload = {
        body: JSON.stringify({
          title: updatedTodo.title,
          description: updatedTodo.description,
          priority: updatedTodo.priority,
          date: updatedTodo.date,
          isEditing: updatedTodo.isEditing,
        }),
      };
      await putRequest(`${baseUrl}/user/todos/${todoId}`, payload);
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoService;
