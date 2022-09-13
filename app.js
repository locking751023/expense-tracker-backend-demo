const express = require('express')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true })) //express 內建 body parser 功能
app.use(methodOverride('_method')) //router method override

// record
app.get('/records', (req, res) => {
  res.send('Records page')
})
app.post('/record/new', (req, res) => {
  res.send('POST Add new record')
})
app.get('/record/:rid', (req, res) => {
  res.send(`Record:${req.params.rid}`)
})
app.post('/record/:rid', (req, res) => {
  res.send(`POST Edit record:${req.params.rid}`)
})
app.delete('/record/:rid', (req, res) => {
  res.send(`DELETE Record:${req.params.rid}`)
})

// user
app.post('/login', (req, res) => {
  res.send('POST Login page')
})
app.post('/register', (req, res) => {
  res.send('POST Register page')
})

//admin
app.post('/admin/product/:pid', (req, res) => {
  res.send(`Maintain product:${req.params.pid}`)
})
app.get('/admin/product', (req, res) => {
  res.send('Show all Product page')
})
app.post('/admin/product/new', (req, res) => {
  res.send('Add product page')
})
app.delete('/admin/product/:pid/delete', (req, res) => {
  res.send('Delete product page')
})
app.delete('/admin/suer/:uid', (req, res) => {
  res.send(`Delete user:${req.params.uid}`)
})
app.get('/admin/users', (req, res) => {
  res.send('Show all Product page')
})
app.delete('/admin/record/:rid', (req, res) => {
  res.send(`Delete record:${req.params.rid}`)
})
app.get('/admin/records', (req, res) => {
  res.send('Show all Product page')
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})