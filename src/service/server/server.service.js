import express, { urlencoded } from 'express'
import { env } from '../../config/env.config.js'
import { Logger } from '../../utils/logger.js'
import { httpLogger } from '../../middleware/logger.middleware.js'
import { DB } from '../db/DB.service.js'
import appRouter from '../../routes/index.js'
import { errorHandler } from '../../middleware/error.middleware.js'

const { server } = env

export class Server {
    static app = express()
    static environment = server.environment
    static port = server.port
    static logger = new Logger('SERVER')

    static async bootstrap(config = {}) {
        server.environment === 'PROD'
            ? this.logger.info('Servidor inicalizando en producción')
            : this.logger.info('Servidor inicializando en modo Desarrollo')

        this.app.use(express.json())
        if(config.multiFormat) {
            this.logger.info('Inicializando form format para el servidor')
            this.app.use(urlencoded({ extended: true }))
        }
        if(config.loggerPrformance) {
            this.logger.info('Inicializando logger de performance')
            this.app.use(httpLogger)
        }

        this.app.use('/api/v1', appRouter)
        this.app.use(errorHandler)

        try {
            await DB.init()
            this.app.listen(this.port, () => {
                this.logger.info(`Servidor corriendo en el puerto ${this.port}`)
            })
        } catch (error) {
            this.logger.error(`Error al inicializar el servidor: ${error.message}`, error.message)
            throw new Error('Errro al arrancar el servidor')
        }
    }


}