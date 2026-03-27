import { RoleService } from "../service/Role.service.js"

export class RoleController {
    static async create(req, res, next) {
        try {
            const data = await RoleService.create(req.body)
            res.status(201).json({
                message: 'Rol creado exitosamente',
                statusCode: 201,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async assignUsers(req, res, next) {
        try {
            const data = await RoleService.assignUsers(req.params.roleId, req.body.userIds)
            res.status(200).json({
                message: 'Usuario asignados con éxito al rol',
                statusCode: 200,
                data
            })
        } catch (error) {
            next(error)
        }
    }
}

