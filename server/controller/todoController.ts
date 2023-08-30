import express from 'express';
import {
  deleteTodoById,
  getTodoById,
  getTodos,
  createTodo,
} from '../service/todoService';

const sendSuccessResponse = <T>(
  res: express.Response,
  data: T,
  statusCode: number = 200
) => {
  res.status(statusCode).json(data);
};

const sendErrorResponse = (
  res: express.Response,
  error: Error | null,
  message: string,
  statusCode: number = 400
) => {
  if (error) {
    console.error(error);
  }
  res.status(statusCode).json({ error: message });
};

export const createDefaultTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;
    const todo = await createTodo({
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
};

export const getAllTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;
    const todos = await getTodos(userId);

    return sendSuccessResponse(res, todos);
  } catch (error) {
    return sendErrorResponse(
      res,
      error as Error,
      'An error occurred while fetching todos.'
    );
  }
};

export const deleteTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await deleteTodoById(todoId);

    return sendSuccessResponse(res, deletedTodo);
  } catch (error) {
    return sendErrorResponse(
      res,
      error as Error,
      'An error occurred while deleting the todo.'
    );
  }
};

export const updateTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const todoId = req.params.todoId;
    const { title, description, priority, date } = req.body;

    if (!title && !description && !priority && !date) {
      return sendErrorResponse(res, null, 'No fields to update.');
    }

    const todo = await getTodoById(todoId);
    if (!todo) {
      return sendErrorResponse(res, null, 'Todo to update not found.', 404);
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (priority) todo.priority = priority;
    if (date) todo.date = new Date(date);

    await todo.save();

    return sendSuccessResponse(res, todo);
  } catch (error) {
    return sendErrorResponse(
      res,
      error as Error,
      'An error occurred while updating the todo.'
    );
  }
};
