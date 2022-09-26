const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const userController = {
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
      const removePassword = {
        ...newUser.toJSON(),
      }
      delete removePassword.password
      res.status(201).json({ status: 'success', message: '帳號註冊成功！', removePassword})
    } catch (err) {
      next(err)
    }
  },
  login: async (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = await jwt.sign(userData, process.env.JWT_SECRET)
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