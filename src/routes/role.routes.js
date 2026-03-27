import { Router } from "express";
import { RoleController } from "../controller/Role.controller.js";

const router = Router()

router.post('/', RoleController.create)
router.put("/users/:roleId", RoleController.assignUsers);

export default router