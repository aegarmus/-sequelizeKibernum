import { User } from "../models/User.model.js";
import { UserError } from "../utils/errors.util.js";
import { Logger } from "../utils/logger.js";


export class UserService {
    static logger = new Logger('USER_SERVICE')

    static async create(data) {
        try {
            this.logger.info('Inicializando Servicio de creación de Usuario')

            //TODO: Validación de los datos de entrada

            const user = await User.create(data);
            this.logger.debug('Usuario creado con éxito', user)
            return user
        } catch (error) {
            this.logger.error(`Error al crear el usuario: ${error.message}`);
            throw new UserError('Error al crear el usuario')
        }
    }

    static async findAll() {
        try {
            this.logger.info('Inicializando servicio de obtención de todos los usuarios')
            
            const user = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            })
            
            //TODO: validar que la respuesta no venga vacía
            
            this.logger.info('Usuarios encontrados con éxito')
            return user
        } catch (error) {
            this.logger.error(`Error al encontrar los usuario ${error.message}`);
            throw new UserError('Error al encontrar los usuarios')
        }
    }

    static async findById(id) {
        try {
            this.logger.info('Inicializando servicio de obtención de usuario por ID')
            const user = await User.findByPk(id, {
                attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            });
            this.logger.debug('Usuario encontrado con éxito')
            
            return user
        } catch (error) {
            this.logger.error(`Error al encontrar el usuario con id: ${id} - ${error.message}`)
            throw new UserError('Error al encontrar el usuario')
        }
    }
    
    static async findByEmail(email) {
        try {
            this.logger.info('Inicializando servicio de obtención de usuario por email')
            const user = await User.findOne({
                where: { email },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            })
            this.logger.debug('Usuario encontrado con éxito')

            return user
        } catch (error) {
            this.logger.error(`Error al encontrar el usuario con email: ${email} - ${error.message}`)
            throw new UserError('Error al encontrar el usuario')
        }
    }
}