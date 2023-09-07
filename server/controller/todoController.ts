import { Request, Response } from 'express';
import todoService from '../service/todoService';
import { sendSuccessResponse, sendErrorResponse } from './response';

class TodoController {
  async createDefaultTodo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new Error('userId was not provided');
      }

      const todo = await todoService.createTodo({
        userId: userId,
      });

      return sendSuccessResponse(res, todo, 201);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred while creating todo.'
      );
    }
  }

  async getAllTodos(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new Error('userId was not provided');
      }

      const todos = await todoService.getTodos(userId);

      return sendSuccessResponse(res, todos);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred while fetching todos.'
      );
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.todoId;

      if (!todoId) {
        throw new Error('todoId was not provided');
      }

      const deletedTodo = await todoService.deleteTodoById(todoId);

      return sendSuccessResponse(res, deletedTodo);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred while deleting the todo.'
      );
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.todoId;

      if (!todoId) {
        throw new Error('todoId was not provided');
      }

      const { title, description, priority, date } = req.body;

      const updateData: Record<string, any> = {};

      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (priority) updateData.priority = priority;
      if (date) updateData.date = new Date(date);

      const updatedTodo = await todoService.updateTodoById(todoId, updateData);

      if (!updatedTodo) {
        return sendErrorResponse(res, null, 'Todo to update not found.', 404);
      }

      return sendSuccessResponse(res, updatedTodo);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred while updating the todo.'
      );
    }
  }

  async createArchivedTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.todoId;

      if (!todoId) {
        throw new Error('todoId was not provided');
      }

      const todo = await todoService.getTodoById(todoId);

      if (!todo) {
        sendErrorResponse(res, null, 'Todo to archive not found.', 404);
      }

      const archivedTodo = await todoService.createArchive({
        title: todo?.title,
        description: todo?.description,
        priority: todo?.priority,
        date: todo?.date,
        isChecked: todo?.isChecked,
        todoId: todoId,
        userId: todo?.userId,
      });

      return sendSuccessResponse(res, archivedTodo, 201);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred while creating archived todo.'
      );
    }
  }
}

export default new TodoController();
