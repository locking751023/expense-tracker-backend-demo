const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const recordController = require('../controllers/record-controller')
const userController = require('../controllers/user-controller')
const { loginAuthenticated, authenticated, authenticatedAdmin } = require('../middleware/auth')

// user
router.post('/login', loginAuthenticated, userController.login)
router.post('/register', userController.register)
router.use('/admin', authenticated, authenticatedAdmin, admin)

//record
router.get('/records', authenticated, recordController.getRecords)
router.post('/record/new', authenticated, recordController.addRecord)
router.put('/record/:rid/edit', authenticated, recordController.putRecord)
router.get('/record/:rid', authenticated, recordController.getRecord)
router.delete('/record/:rid', authenticated, recordController.deleteRecord)



module.exports = router
