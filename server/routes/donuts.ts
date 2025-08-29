import express from 'express'
import * as fs from 'node:fs/promises'

const router = express.Router()

// helper to load file
async function loadDonutData() {
  const json = await fs.readFile('storage/donut.json', 'utf8')
  return JSON.parse(json)
}

// returns whole file
router.get('/', async (req, res) => {
  try {
    const data = await loadDonutData()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load donuts' })
  }
})

// return only frostings 
router.get('/frostings', async (req, res) => {
  try {
    const data = await loadDonutData()
    res.json(data.frostings ?? [])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load frostings' })
  }
})

// return only toppings
router.get('/toppings', async (req, res) => {
  try {
    const data = await loadDonutData()
    res.json(data.toppings ?? [])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load toppings' })
  }
})

export default router
