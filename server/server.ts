import * as Path from 'node:path'
import express from 'express'
import donuts from './routes/donuts.ts'
import cors, { CorsOptions } from 'cors'


const server = express()

// Serve images from storage
server.use("/storage", express.static(Path.resolve("storage")))

server.get('/api/v1/greeting', (req, res) => {
  const greetings = ['hola', 'hi', 'hello', 'howdy']
  const index = Math.floor(Math.random() * greetings.length)
  console.log('Hididdly hoo neighbouroony ' + index)
  res.json({ greeting: greetings[index] })
})

server.use(express.json())
server.use(cors('*' as CorsOptions))
server.use('/api/v1/donuts', donuts)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
