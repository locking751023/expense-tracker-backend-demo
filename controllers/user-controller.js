const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const userController = {
  register: (req, res, next) => {
    const { name, email, password, checkPassword } = req.body
    if (!name || !email || !password || !checkPassword ) return res.status(400).json({ status: 'error', message: '所有欄位為必填!'})
    if (password !== checkPassword) return res.status(400).json({ status: 'error', message: '請確認密碼輸入一致！' })
    User.findOne({ where: { email } })
      .then(user => {
        if (user) return res.status(400).json({ status: 'error', message: 'email 已被註冊！' })
        return bcrypt.hash(password, 10)
      })
      .then(hash => User.create({
          name,
          email,
          password: hash
      }))
      .then(() => {
        res.status(201).json({ status: 'success', message: '帳號註冊成功！'})
      })
      .catch(err => next(err))
  },
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET)
      res.status(200).json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController