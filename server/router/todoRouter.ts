import express from 'express';
import {
  createDefaultTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from '../controller/todoController';

export default (router: express.Router) => {
  router.post('/todos/new/:userId', createDefaultTodo);
  router.get('/todos/:userId', getAllTodos);
  router.delete('/todos/delete/:todoId', deleteTodo);
  router.put('/todos/update/:todoId', updateTodo);
};
