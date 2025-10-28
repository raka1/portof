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
