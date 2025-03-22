import {Router} from 'express';
import * as TodoController from '../controllers/todoController';

const router = Router();

router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);
router.put('/:id', TodoController.updateTodo);

export default router;