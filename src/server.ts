import express from 'express'

const app = express()

app.post('/courses', (req, res) => {
  const { name } = req.body

  return res.json({ name })
})

app.listen(3333, () => console.log('Server is running!'))
