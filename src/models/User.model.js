import { Model, DataTypes} from 'sequelize'

export class User extends Model{}

export const initUser = (dbConfig) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'El nombre de usuario no puede ser un campo vacio'},
                    len: {
                        args: [2, 50],
                        msg: 'El nombre no puede ser menor a 2 ni mayor que 50 carácteres'
                    },
                    is: {
                        args: /^[a-zA-ZñÑÁÉÍÓÚáéíóú\s]+$/,
                        msg: 'El nombre solo puede contener caracter del abecesario español'
                    }
                }
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'El nombre de usuario no puede ser un campo vacio'},
                    len: {
                        args: [2, 50],
                        msg: 'El nombre no puede ser menor a 2 ni mayor que 50 carácteres'
                    },
                    is: {
                        args: /^[a-zA-ZñÑÁÉÍÓÚáéíóú\s]+$/,
                        msg: 'El nombre solo puede contener caracter del abecesario español'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: 'El correo electornico ingresado ya esta en uso'},
                validate: {
                    notEmpty: { msg: 'El correo electronico no puede ser un campo vacio'},
                    isEmail: { msg: 'El correo electronico ingresado no es valido'}
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'El Telefono no puede estar vacio'},
                    is: {
                        args: /^(\+?56)?(9\d{8}|[2-9]\d{7,8})$/,
                        msg: 'El número de télefono ingresado no es válido'
                    }
                }
            },
            
        },
        {
            sequelize: dbConfig,
            modelName: 'User',
            tableName: 'users',
            timestamps: true, //-> createdAt updatedAt
            paranoid: true // habilita el soft delete al usar destroy -> agrega un campo nuevo -> deletedAt
        }
    )
}