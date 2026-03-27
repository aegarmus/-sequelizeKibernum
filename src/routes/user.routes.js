import { Router } from 'express'
import { UserController } from '../controller/User.controller.js';

const router = Router();

router.post('/', UserController.create)
router.get('/', UserController.findAll)
router.get('/:id', UserController.findById)
router.get('/email/:email', UserController.findByEmail)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)
router.delete('/admin/:id', UserController.permaDelete)
router.patch('/:id', UserController.restore)

export default router