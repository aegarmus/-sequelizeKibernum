import { User } from "../models/User.model.js";
import { NotFoundError, UserError } from "../utils/errors.util.js";
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
            
            if(!user) {
                this.logger.warn(`Usuario con id: ${id} no contrado`)
                throw new NotFoundError('No pudimos encontrar al usuario', `Usuario con id: ${id} no contrado`)
            }

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
    
    static async update(id, newData) {
        try {
            this.logger.info('Inicializando servicio de actualización de usuario por id')
            
            const [ updateRows, [ userUpdated ] ] = await User.update(newData, {
                where: { id },
                returning: true,
            })
            
            if(updateRows === 0) {
                throw new NotFoundError(`No se encontro al usuario con el id: ${id}`)
            }
            this.logger.debug('Usuario actualizado con éxito', userUpdated)

            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            });
            
            return updatedUser
        } catch (error) {
            this.logger.error('Error al intentar actualizar al usuario')
            throw new UserError('Error al actualizar al usuario')
        }
    }
    
    static async delete(id) {
        try {
            this.logger.info('Inicializando servicio de eliminación de usuario por id')
            //confirmamos que el usuario esta
            this.logger.info('Buscando al usuario')
            const user = await User.findByPk(id)

            if(!user) {
                this.logger.error(`No encontramos ningún usuario con id: ${id} - ${error.message}`)
                throw new NotFoundError(`No encontramos ningún usuario con id: ${id}`)
            }
            this.logger.debug('usuario encontrado y listo para eliminar')

            await user.destroy()
            this.logger.info('Usuario eliminado con éxito')
        } catch (error) {
            this.logger.error("Error al intentar eliminar al usuario");
            throw new UserError("Error al eliminar al usuario");
        }
    }

    static async restore(id) {
        try {
            this.logger.info('Inicializando servicio de eliminación de usuario por id')
            //confirmamos que el usuario esta
            this.logger.info('Buscando al usuario')
            const user = await User.findByPk(id, { paranoid: false })

            if(!user) {
                this.logger.error(`No encontramos ningún usuario con id: ${id} - ${error.message}`)
                throw new NotFoundError(`No encontramos ningún usuario con id: ${id}`)
            }
            this.logger.debug('usuario encontrado y listo para eliminar')

            await user.restore()
            this.logger.info('Usuario eliminado con éxito')
        } catch (error) {
            this.logger.error("Error al intentar eliminar al usuario");
            throw new UserError("Error al eliminar al usuario");
        }
    }

    static async permaDelete(id) {
        try {
            this.logger.info('Inicializando servicio de eliminación de usuario por id')
            //confirmamos que el usuario esta
            this.logger.info('Buscando al usuario')
            const user = await User.findByPk(id)

            if(!user) {
                this.logger.error(`No encontramos ningún usuario con id: ${id} - ${error.message}`)
                throw new NotFoundError(`No encontramos ningún usuario con id: ${id}`)
            }
            this.logger.debug('usuario encontrado y listo para eliminar')

            await user.destroy({ force: true })
            this.logger.info('Usuario eliminado con éxito')
        } catch (error) {
            this.logger.error("Error al intentar eliminar al usuario");
            throw new UserError("Error al eliminar al usuario");
        }
    }
}