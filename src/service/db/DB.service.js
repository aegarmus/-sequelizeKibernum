import { dbConfig } from "../../config/db.config.js";
import { defineAssociation } from "../../models/associations/UserRole.association.js";
import { initRole } from "../../models/Role.model.js";
import { initUser } from "../../models/User.model.js";
import { DBError } from "../../utils/errors.util.js";
import { Logger } from "../../utils/logger.js";


export class DB {
    static logger = new Logger('DATABASE')

    static async init() {
        try {
            this.logger.info('Inicializando Base de Datos')
    
            this.logger.debug('Comenzando autenticación en DB')
            await dbConfig.authenticate() // me autentico en la base de datos con los datos que le entregue al config
            this.logger.debug('Autenticado con éxito en la DB')
    
            this.initModels(dbConfig)

            this.logger.info('Sincronizando con la Base de datos')
            await dbConfig.sync()
            this.logger.info('Sincronización completada')
        } catch (error) {
            this.logger.error('No pudimos conecntarnos a la base de datos 👻', error)
            process.exit(1)
            
        }
    }

    static initModels(config) {
        try {
            this.logger.info('Inicializando modelos')

            this.logger.debug('Inicializando Modelo User')
            initUser(config)
            this.logger.debug('User inicializado con éxito')
            this.logger.debug('Inicializando Modelo Role')
            initRole(config)
            this.logger.debug('Role inicializado con éxito')

            this.logger.debug('Incializando asociaciones')
            defineAssociation()
            this.logger.debug('Asociaciones creadas')
        } catch (error) {
            this.logger.error(`Error al inicializar los módelos: ${error.message}`);
            throw new DBError('Error al inicalizar los modelos')
        }
    }
}