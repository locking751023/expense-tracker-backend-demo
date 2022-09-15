const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/admin/products', adminController.getProducts)
router.post('/admin/product/new', adminController.addProduct)
router.post('/admin/product/:pid', adminController.editProduct)
router.delete('/admin/product/:pid/delete', adminController.deleteProduct)

router.get('/admin/users', adminController.getUsers)
router.delete('/admin/suer/:uid', adminController.deleteUser)

router.get('/admin/records', adminController.getRecords)
router.delete('/admin/record/:rid', adminController.deleteRecord)

module.exports = router
