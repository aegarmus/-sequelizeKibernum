import { Role } from "../models/Role.model.js";
import { User } from "../models/User.model.js";
import { RoleError } from "../utils/errors.util.js";
import { Logger } from "../utils/logger.js";


export class RoleService {
    static logger = new Logger('ROLE_SERVICE')

    static async create(data) {
        try {
            this.logger.info('Inicializando creación de un nuevo rol')

            const role = await Role.create(data)
            this.logger.debug('Role creado exitosamente')

            return role
        } catch (error) {
            this.logger.error(`Error al crear el rol: ${error.message}`, error)
            throw new RoleError('Error al crear el rol')
        }
    }

    static async assignUsers(roleId, userIds) {
        try {
            this.logger.info(`Asignando usuarios al rol ${roleId}`)

            this.logger.info('Encontrando rol')
            const role = await Role.findByPk(roleId)
            if(!role) {
                this.logger.error('Rol no encontrado')
                throw new RoleError('Role no encontrado')
            }
            this.logger.debug('Rol encontrado con éxito')

            this.logger.info('Verificando usuarios')
            const users = await User.findAll({
                where: { id: userIds }
            })
            if(users.length !== userIds.length) {
                this.logger.error('Algunos usuarios no fueron encontrados')
                throw new RoleError('Algunos usuarios no fueron encontrados')
            }

            this.logger.debug('Usuario encontrado con éxito')

            this.logger.info('Asignando usuarios al rol')
            await role.setUsers(userIds)

            const roleWithUsers = await Role.findByPk(roleId, {
                include: [
                    {
                        model: User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname', 'email']
                    }
                ]
            })

            return roleWithUsers
        } catch (error) {
            this.logger.error(`Error al asignar usuarios al rol: ${error.message}`, error)
            throw new RoleError("Error al asignar usuarios al rol");
        }
    }
}