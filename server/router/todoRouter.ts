import express from 'express';
import {
  createDefaultTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from '../controller/todoController';

export default (router: express.Router) => {
  router.post('/new/:userId', createDefaultTodo);
  router.get('/:userId', getAllTodos);
  router.delete('/delete/:todoId', deleteTodo);
  router.put('/update/:todoId', updateTodo);
};
