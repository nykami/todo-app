import { Router } from 'express';
import todoController from '../controller/todoController';

const router = Router();

router.post('/', todoController.createDefaultTodo);
router.get('/', todoController.getTodos);
router.delete('/:todoId', todoController.deleteTodo);
router.put('/:todoId', todoController.updateTodo);
router.post('/archive/:todoId', todoController.createArchivedTodo);
router.put('/check/:todoId', todoController.updateIsChecked);

export default router;
