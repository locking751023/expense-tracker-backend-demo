const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const recordController = require('../controllers/record-controller')
const userController = require('../controllers/user-controller')

router.get('/records', recordController.getRecords)
router.post('/record/new', recordController.addRecord)
router.get('/record/:rid', recordController.getRecord)
router.post('/record/:rid', recordController.postRecord)
router.delete('/record/:rid', recordController.deleteRecord)

// user
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

router.use('/admin', admin)

module.exports = router
