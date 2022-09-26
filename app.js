const express = require('express')
const passport = require('passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT
const api = require('./routers/index')

app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
app.use(passport.initialize())
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})