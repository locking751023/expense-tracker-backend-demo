const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')

const { User, Record, RecordedProduct } = require('../models')

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, cb) => {
  User.findOne({ where: { email }})
    .then(user => {
      if (!user) return cb(null, false)
      bcrypt.compare(password, user.password).then(result => {
        if (!result) return cb(null, false)
        return cb(null, user)
      })
    })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {
    include: Record
  })
    .then(user => {
      cb(null, user)
    })
    .catch(err => cb(err))
}))

module.exports = passport