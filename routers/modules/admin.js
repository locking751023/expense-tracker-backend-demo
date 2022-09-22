const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/products', adminController.getProducts)
router.post('/product/new', adminController.addProduct)
router.post('/product/:pid', adminController.editProduct)
router.delete('/product/:pid/delete', adminController.deleteProduct)

router.get('/users', adminController.getUsers)
router.delete('/suer/:uid', adminController.deleteUser)

router.get('/records', adminController.getRecords)
router.delete('/record/:rid', adminController.deleteRecord)

module.exports = router
