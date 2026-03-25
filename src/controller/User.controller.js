import { UserService } from "../service/User.service.js";


export class UserController{
    static async create(req, res, next) {
        try {
            const data = await UserService.create(req.body)
            res.status(201).json({
                message: 'Usuario Creado con éxito',
                statusCode: 201,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async findAll(req, res, next) {
        try {
            const data = await UserService.findAll()
            res.status(200).json({
                message: 'Usuarios encontrados con éxito',
                statusCode: 200,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async findById(req, res, next) {
        try {
            const data = await UserService.findById(req.params.id)
            res.status(200).json({
                message: 'Usuario encontrado con éxito',
                statusCode: 200,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async findByEmail(req, res, next) {
        try {
            const data = await UserService.findByEmail(req.params.email)
            res.status(200).json({
                message: "Usuario encontrado con éxito",
                statusCode: 200,
                data,
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const data = await UserService.update(req.params.id, req.body)
            res.status(200).json({
                message: 'Usuario actualizado con éxito',
                statudCode: 200,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            await UserService.delete(req.params.id)
            res.status(200).json({
                message: 'Usuario eliminado con éxito',
                statusCode: 200
            })
        } catch (error) {
            next(error)
        }
    }

    static async restore(req, res, next) {
        try {
            await UserService.restore(req.params.id)
            res.status(200).json({
                message: 'Usuario restaurado con éxito',
                statusCode: 200
            })
        } catch (error) {
            next(error)
        }
    }

    static async permaDelete(req, res, next) {
        try {
            await UserService.permaDelete(req.params.id)
            res.status(200).json({
                message: 'Usuario eliminado permanentemente con éxito',
                statusCode: 200
            })
        } catch (error) {
            next(error)
        }
    }
}