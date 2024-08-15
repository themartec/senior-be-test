require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { AuthRouter } from '@/controller/auth.controller'
import { FileRouter } from '@/controller/file.controller'
import { getTokensMiddleware } from '@/middleware/token.middleware'
import path from 'path'
import * as process from 'node:process'
import { getUserMetadataService } from '@/service/user.service'


const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use('/api/auth', AuthRouter)
app.use('/api/file', getTokensMiddleware, FileRouter)
app.use('/api/metadata', async (req: express.Request, res: express.Response) => {
  const userIdCookie = req.signedCookies['auth']
  if (!userIdCookie) {
    res.status(401).send({ message: 'Not Logged In' })
  } else {
    const tokensFromDB = await getUserMetadataService(userIdCookie)
    res.status(200).json({user: userIdCookie, integrations: Object.keys(tokensFromDB) })
  }
})

app.use('/redirect', async (req: express.Request, res: express.Response) => {
  res.redirect(process.env.FRONT_END_URL!)
})


app.use('/api/logout', async (req: express.Request, res: express.Response) => {
  res.clearCookie('auth', { path: '/' })
  res.redirect(process.env.FRONT_END_URL!)
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Hello Pug', message: 'Welcome to your Pug template!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`)
})