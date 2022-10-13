const { Product, Location, User, Record, RecordedProduct } = require('../models')

const adminController = {
  addProduct: async (req, res, next) => {
    try {
      const { name, price, unit, cost } = req.body.data
      if (!name || !price || !unit || !cost) return res.status(400).json({ status: 'error', message: '所有欄位為必填' })
      if (cost > price) return res.status(400).json({ status: 'error', message: "請確認price及cost輸入是否正確" })
      const isNameRepeat = await Product.findOne({ where: { name } })
      if (isNameRepeat) return res.status(400).json({ status: 'error', message: '產品名稱已存在' })
      const newProduct = await Product.create({
        name,
        price,
        unit,
        cost
      })
      return res.status(200).json({ status: 'success', newProduct })
    } catch (err) {
      next(err)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { name, price, unit, cost } = req.body.data
      if (!name || !price || !unit || !cost) return res.status(400).json({ status: 'error', message: '所有欄位為必填' })
      if (cost > price) return res.status(400).json({ status: 'error', message: "請確認price及cost輸入是否正確" })
      const product = await Product.findByPk(req.params.pid)
      if (!product) return res.status(400).json({ status: 'error', message: '產品資料不存在' })
      const updatedProduct = await product.update({
        name,
        price,
        unit,
        cost
      })
      return res.status(200).json({ status: 'success', updatedProduct })
    } catch (err) {
      next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.pid)
      if (!product) return res.status(400).json({ status: 'error', message: '產品資料不存在' })
      const deletedProduct = await product.destroy()
      return res.status(200).json({ status: 'success', deletedProduct })
    } catch (err) {
      next(err)
    }
  },
  addLocation: async (req, res, next) => {
    try {
      const { name } = req.body.data
      if (!name) return res.status(400).json({ status: 'error', message: '市場名稱為必填' })
      const isLocationRepeat = await Location.findOne({ where: { name } })
      if (isLocationRepeat) return res.status(400).json({ status: 'error', message: '市場名稱已存在' })
      const newLocation = await Location.create({
        name
      })
      return res.status(200).json({ status: 'success', newLocation })
    } catch (err) {
      next(err)
    }
  },
  updateLocation: async (req, res, next) => {
    try {
      const { name } = req.body.data
      const location = await Location.findByPk(req.params.lid)
      if (!location) return res.status(400).json({ status: 'error', message: '資料不存在' })
      if (!name) return res.status(400).json({ status: 'error', message: '市場名稱為必填' })
      const isLocationRepeat = await Location.findOne({ where: { name } })
      if (isLocationRepeat) return res.status(400).json({ status: 'error', message: '市場名稱已存在' })
      const updateLocation = await location.update({
        name
      })
      return res.status(200).json({ status: 'success', updateLocation })
    } catch (err) {
      next(err)
    }
  },
  deleteLocation: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.lid)
      if (!location) return res.status(400).json({ status: 'error', message: '資料不存在' })
      const deletedLocation = await location.destroy()
      return res.status(200).json({ status: 'success', deletedLocation })
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          { model: Record, include: RecordedProduct }
        ]
      })
      const userRemovePassword = users.map(user => {
        const newUser = { ...user.toJSON() }
        delete newUser.password
        return newUser
      })
      return res.status(200).json({ status: 'success', userRemovePassword })
    } catch (err) {
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.uid, {
        include: [Record]
      })
      if (!user) return res.status(400).json({ status: 'error', message: '使用者資料不存在' })
      await user.Records.map(record => {
        RecordedProduct.destroy({ where: { recordId: record.id } })
        Record.destroy({ where: { id: record.id } })
      })
      const deletedUser = await user.destroy()
      return res.status(200).json({ status: 'success', message: '使用者資料已全部完除', deletedUser })
    } catch (err) {
      next(err)
    }
  },
  getRecords: async (req, res, next) => {
    try {
      const records = await Record.findAll({
        order: [['date', 'DESC']],
        include: [User, Location, RecordedProduct]
      })
      return res.status(200).json({ status: 'success', records })
    } catch (err) {
      next(err)
    }
  },
  deleteRecord: async (req, res, next) => {
    try {
      const recordId = req.params.rid
      const record = await Record.findByPk(recordId)
      if (!record) return res.status(400).json({ status: 'error', message: '資料不存在' })
      const deletedRecordedProduct = await RecordedProduct.destroy({ where: { recordId } })
      const deletedRecord = await record.destroy()
      return res.status(200).json({ status: 'success', deletedRecord, deletedRecordedProduct })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController