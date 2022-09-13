const express = require('express')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('This is Express Server.')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})