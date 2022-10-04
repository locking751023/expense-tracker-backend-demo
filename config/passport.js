const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')

const { User, Record, RecordedProduct, Location } = require('../models')

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, cb) => {
  User.findOne({
    where: { email },
    include: [
      { model: Record, order: [['date', 'DESC']], include: [Location, RecordedProduct] }
    ]
  })
    .then(user => {
      if (!user) return cb(null, false, { status: 'error', message: 'email錯誤或尚未註冊!'})
      bcrypt.compare(password, user.password).then(result => {
        if (!result) return cb(null, false, { status: 'error', message: 'email或密碼錯誤!' })
        req.user = user
        return cb(null, user)
      })
    })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}

passport.use(new JWTStrategy(jwtOptions, (req, jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {
    include: [
      { model: Record, order: [['date', 'DESC']], include: [Location, RecordedProduct] }
    ]
  })
    .then(user => {
      req.user = user
      cb(null, user)
    })
    .catch(err => cb(err))
}))

module.exports = passport