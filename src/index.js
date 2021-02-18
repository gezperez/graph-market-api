import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import throng from 'throng'
import os from 'os'

import context from './utils/context'
import schema from './modules'
import config from './config'

const cors = {
    credentials: true,
    allowedHeaders: ['Authorization'],
    exposedHeaders: ['Authorization'],
};

const app = express()

const WORKERS = os.cpus().length

const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
        user: await context.getUser(req)
    })
})

server.applyMiddleware({
    path: '/api',
    app,
    cors
})

const startServer = async function () {
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        promiseLibrary: global.Promise
    }
    try {
        await Promise.all([
            mongoose.connect(config.MONGODB_URI, mongooseOptions),
            app.listen(config.PORT)
        ])
        console.log(`Server has started on port: ${config.PORT}`)
    } catch (error) {
        console.error(`Could not start the app: `, error)
    }
}

throng(startServer, {
    workers: WORKERS,
    lifetime: Infinity
});
