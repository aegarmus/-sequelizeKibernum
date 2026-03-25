import { dbConfig } from "../../config/db.config.js";
import { Logger } from "../../utils/logger.js";


export class DB {
    static logger = new Logger('DATABASE')

    static async init() {
        try {
            this.logger.info('Inicializando Base de Datos')
    
            this.logger.debug('Comenzando autenticación en DB')
            await dbConfig.authenticate() // me autentico en la base de datos con los datos que le entregue al config
            this.logger.debug('Autenticado con éxito en la DB')
    
            this.logger.info('Sincronizando con la Base de datos')
            await dbConfig.sync()
            this.logger.info('Sincronización completada')
        } catch (error) {
            this.logger.error('No pudimos conecntarnos a la base de datos 👻', error)
            process.exit(1)
            
        }
    }
}