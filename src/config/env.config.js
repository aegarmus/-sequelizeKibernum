import dotenv from 'dotenv'

dotenv.config()

export const env = {
    server: {
        environment: process.env.ENVIRONMENT,
        port: process.env.PORT
    }
}