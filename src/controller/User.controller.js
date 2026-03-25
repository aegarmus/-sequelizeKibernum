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
}