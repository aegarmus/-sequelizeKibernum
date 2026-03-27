import { Model, DataTypes } from "sequelize";
import { RoleError } from "../utils/errors.util.js";

export class Role extends Model{}

export const initRole = (dbConfig) => {
    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: 'Ya existe un rol con este nombre' },
                validate: {
                    notEmpty: { msg: 'El Nombre del rol no puede estar vacío'},
                    len: {
                        args: [3, 30],
                        msg: 'El nombre del rol debe tener entre 3 y 30 caracteres'
                    },
                    is: {
                        args: /^[a-zA-Z0-9_-]+$/,
                        msg: 'El nombre del rol solo puede contener letras, números, guiones y guiones bajos'
                    }
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len:  {
                        args: [0, 255],
                        msg: 'La descripción no puede exceder los 255 caracteres'
                    }
                }
            },
            permissions: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: [],
                validate: {
                    isValidPermission(value) {
                        if(!Array.isArray(value)) {
                            throw new RoleError('Los permisos deben estar contenidos en un arreglo')
                        }
                        const validPermission = [ 'read', 'write', 'delete', 'admin'];
                        value.forEach(permission => {
                            if(!validPermission.includes(permission))
                                throw new RoleError(`Permiso inválido: ${permission}`)
                        })
                    }
                }
            }
        },
        {
            sequelize: dbConfig,
            modelName: 'Role',
            tableName: 'roles',
            timestamps: true,
            paranoid: true
        }
    )
}