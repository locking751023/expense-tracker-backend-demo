const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  register: (req, res, next) => {
    const { name, email, password, checkPassword } = req.body
    if (!name || !email || !password || !checkPassword ) return res.status(400).json({ status: 400, message: '所有欄位為必填!'})
    if (password !== checkPassword) return res.status(400).json({ status: 400, message: '請確認密碼輸入一致！' })
    User.findOne({ where: { email } })
      .then(user => {
        if (user) return res.status(400).json({ status: 400, message: 'email 已被註冊！' })
        return bcrypt.hash(password, 10)
      })
      .then(hash => User.create({
          name,
          email,
          password: hash
      }))
      .then(() => {
        res.status(201).json({ status: 201, message: '帳號註冊成功！'})
      })
      .catch(err => next(err))
  },
  login: (req, res) => {
    res.send('POST Login page')
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/api/login')
  }
}

module.exports = userController