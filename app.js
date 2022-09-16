const express = require('express')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
const api = require('./routers/index')
const db = require('./models')

app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method')) 
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})