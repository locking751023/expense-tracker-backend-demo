const { Product } = require('../models')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true, nest: true })
      return res.status(200).json({ status: 'success', products})
    } catch (err) {
      next(err)
    }
  },
}

module.exports = productController