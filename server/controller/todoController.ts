import { Request, Response } from 'express';
import todoService from '../service/todoService';
import { sendSuccessResponse, sendErrorResponse } from './response';

class TodoController {
  async createDefaultTodo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
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
}

export default new TodoController();
