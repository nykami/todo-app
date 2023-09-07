import { Router } from 'express';
import todoController from '../controller/todoController';

const router = Router();

router.post('/:userId', todoController.createDefaultTodo);
router.get('/:userId', todoController.getTodos);
router.delete('/:todoId', todoController.deleteTodo);
router.put('/:todoId', todoController.updateTodo);
router.post('/archive/:todoId', todoController.createArchivedTodo);

export default router;
