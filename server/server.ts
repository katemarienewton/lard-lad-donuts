import * as Path from 'node:path'
import express from 'express'
import donuts from './routes/donuts.ts'
import cors, { CorsOptions } from 'cors'
import fs from 'fs'
import { fileURLToPath } from 'url'


const server = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const dataPath = Path.join(__dirname, '../donut.json')

function loadDonuts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
}

function saveDonuts(data: any) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

server.use(cors('*' as CorsOptions))

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

server.post('/api/v1/frostings', (req, res) => {
  const { frosting, newFrostings } = req.body
  const data = loadDonuts()

  if (frosting) {
    data.frostings.push(frosting);
  } else if (Array.isArray(newFrostings)) {
    data.frostings.push(...newFrostings);
  } else {
    return res.status(400).json({ error: 'Frosting(s) is required' });
  }

  saveDonuts(data)
  res.json({ success: true, frostings: data.frostings });
});

server.post('/api/v1/toppings', (req, res) => {
  const { topping, newToppings } = req.body
  const data = loadDonuts()

  if (topping) {
    data.toppings.push(topping);
  } else if (Array.isArray(newToppings)) {
    data.toppings.push(...newToppings);
  } else {
    return res.status(400).json({ error: 'Topping(s) is required' });
  }

  saveDonuts(data)
  res.json({ success: true, toppings: data.toppings })
});

export default server
