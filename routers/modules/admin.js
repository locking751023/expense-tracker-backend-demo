const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

//product
router.post('/product/new', adminController.addProduct)
router.put('/product/:pid/edit', adminController.updateProduct)
router.delete('/product/:pid/delete', adminController.deleteProduct)
//location
router.post('/location/new', adminController.addLocation)
router.put('/location/:lid/edit', adminController.updateLocation)
router.delete('/location/:lid/delete', adminController.deleteLocation)
//user
router.get('/users', adminController.getUsers)
router.delete('/user/:uid/delete', adminController.deleteUser)
//record
router.get('/records', adminController.getRecords)
router.delete('/record/:rid/delete', adminController.deleteRecord)

module.exports = router
