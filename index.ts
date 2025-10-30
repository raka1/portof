import mongoose from 'mongoose'
import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import ratelimit from 'koa-ratelimit'
import Redis from 'ioredis'
import dotenv from 'dotenv'

import { sendMessage } from './routes/message'
import { getProjects } from './routes/project'
import { getSkills } from './routes/skill'

dotenv.config()

const PORT = process.env.PORT as string
const MONGO_URI = process.env.MONGO_URI as string

const app = new Koa()
const router = new Router()
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
})

// Middleware
app.use(bodyParser())

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST'],
  })
)

// Rate Limiter
app.use(
  ratelimit({
    driver: 'redis',
    db: redis,
    duration: 60000,
    errorMessage: 'Too many requests, please try again later.',
    id: (ctx) => ctx.ip,
    max: 60,
  })
)

// DB connect
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

// Endpoints
router.post(
  '/message/send',
  ratelimit({
    driver: 'redis',
    db: redis,
    duration: 60000,
    id: (ctx) => ctx.ip,
    max: 5,
  }),
  sendMessage
)
router.get('/projects/get', getProjects)
router.get('/skills/get', getSkills)

// Router
app.use(router.routes()).use(router.allowedMethods())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running with port ${PORT}`)
})
