import { Router } from 'express' 
import userRouter from './user.routes.js'
import roleRouter from './role.routes.js'

const router = Router()

router.use('/users', userRouter)
router.use('/roles', roleRouter)

export default router

