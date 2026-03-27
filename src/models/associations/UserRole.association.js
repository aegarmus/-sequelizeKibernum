import { User } from "../User.model.js";
import { Role } from '../Role.model.js'

export const defineAssociation = () => {
    User.belongsToMany(Role, {
        through: 'user_role', //Tabla intermedia,
        foreignKey: 'userId',
        otherKey: 'roleId',
        as: 'roles',
        timestamps: true
    })

    Role.belongsToMany(User, {
        through: 'user_role', // Mismo nombre de la tabla intermedia anterior
        foreignKey: 'roleId',
        otherKey: 'userId',
        as: 'users',
        timestamps: true
    })
}