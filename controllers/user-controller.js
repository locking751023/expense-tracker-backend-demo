const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const userController = {
  getUser: async (req, res, next) => {
    try {
      const user = req.user.toJSON()
      delete user.password
      return res.status(200).json({ status: 'success', user })
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, checkPassword } = req.body
      if (!name || !email || !password || !checkPassword ) return res.status(400).json({ status: 'error', message: '所有欄位為必填!'})
      if (password !== checkPassword) return res.status(400).json({ status: 'error', message: '請確認密碼輸入一致！' })
      const user = await User.findOne({ where: { email } })
      if (user) return res.status(400).json({ status: 'error', message: 'email 已被註冊！' })
      const hash = await bcrypt.hash(password, 10)
      const newUser = await User.create({
          name,
          email,
          password: hash
      })
      const userWithoutPassword = {
        ...newUser.toJSON(),
      }
      delete userWithoutPassword.password
      res.status(201).json({ status: 'success', message: '帳號註冊成功！', userWithoutPassword})
    } catch (err) {
      next(err)
    }
  },
  login: async (req, res, next) => {
    try {
      const { expiresIn } = req.body
      const userData = req.user.toJSON()
      delete userData.password
      const payload = {
        ...userData,
      }
      delete payload.Records
      const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
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