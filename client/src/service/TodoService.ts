import { Todo } from '../components/types/Todo.vue';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const baseUrl = import.meta.env.VITE_BASE_URL;

class TodoService {
  async getTodos(
    sortAttribute: string,
    order: string,
    searchInput: string,
    isSortingApplied: boolean,
  ) {
    try {
      let url = `${baseUrl}/user/todos`;

      if (sortAttribute) {
        url += `?sortingBy=${sortAttribute}&order=${order}`;
      }
      if (searchInput) {
        url += `${sortAttribute ? '&' : '?'}searchInput=${searchInput}`;
      }

      let todoData = await getRequest(`${url}`);

      if (!isSortingApplied) {
        const toTop: Todo[] = todoData.filter((todo: Todo) => {
          return todo.isChecked === false;
        });
        const toBottom: Todo[] = todoData.filter((todo: Todo) => {
          return todo.isChecked === true;
        });
        todoData = toBottom.concat(toTop);
      }

      return todoData.map((todo: Todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async addTodo() {
    try {
      const todo = await postRequest(`${baseUrl}/user/todos`, {});
      todo.date = new Date(todo.date);
      return todo;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await deleteRequest(`${baseUrl}/user/todos/${todoId}`);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }

  async createArchive(todoId: string) {
    try {
      await postRequest(`${baseUrl}/user/todos/archive/${todoId}`);
    } catch (error) {
      console.error(error);
    }
  }

  async updateIsChecked(todoId: string) {
    try {
      const updatedTodo = await putRequest(
        `${baseUrl}/user/todos/check/${todoId}`,
      );
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoService;
