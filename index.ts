import mongoose from 'mongoose'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'

import { sendMessage } from './routes/message'
import { getProjects } from './routes/project'
import { getSkills } from './routes/skill'

dotenv.config()

const PORT = process.env.PORT as string
const MONGO_URI = process.env.MONGO_URI as string

const app = new Koa()
const router = new Router()

// Middleware
app.use(bodyParser())

const origin = process.env.FRONT_END as string

app.use(async (ctx, next) => {
  const referer = ctx.get('Referer')

  if ((!referer || !referer.startsWith(origin)) && process.env.NODE_ENV == 'production') {
    ctx.status = 403
    ctx.body = 'Forbidden: Invalid origin or referer'
    return
  }

  await next()
})

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
router.post('/message/send', sendMessage)
router.get('/projects/get', getProjects)
router.get('/skills/get', getSkills)

// Router
app.use(router.routes()).use(router.allowedMethods())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running with port ${PORT}`)
})
