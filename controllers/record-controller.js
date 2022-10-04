const { Record, Location, RecordedProduct, Product } = require('../models')
const dayjs = require('dayjs')
const CustomParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(CustomParseFormat)

const recordController = {
  getRecords: async(req, res, next) => {
    try {
      const userId = req.user.id
      const records = await Record.findAll({
        where: { userId },
        order: [['date', 'DESC']],
        include: [Location, RecordedProduct]
      })
      return res.status(200).json({ status: 'success', records })
    } catch (err) {
        next(err)
    }
  },
  getRecord: async (req, res, next) => {
    try {
      const recordId = req.params.rid
      const record = await Record.findByPk(recordId, {
        order: [['date', 'DESC']],
        include: [Location, {model: RecordedProduct, include: [Product]}]
      })
      if (req.user.id !== record.userId) return res.status(400).json({ status: 'error', message: '權限不足'})
      return res.status(200).json({ status: 'success', record })
    } catch (err) {
      next(err)
    }
  },
  addRecord: async (req, res, next) => {
    try {
      console.log('req.body:', req.body.data)
      const { date, locationId, products } = req.body.data
      if (!dayjs(date).isValid()) return res.status(400).json({ status: 'error', message: '請確認輸入日期是否有效' })
      const location = await Location.findByPk(locationId)
      if (!location) return res.status(400).json({ status: 'error', message: '請確認地點輸入正確'})
      const record = await Record.create({
        date,
        userId: req.user.id,
        locationId
      })
      const recordedProductLists = products.map(product => {
        const newProduct = {
          ...product,
          recordId: record.id,
        }
        return newProduct
      })
      const recordedProducts = await RecordedProduct.bulkCreate(recordedProductLists)
      return res.status(200).json({ status: 'success', record, recordedProducts })
    } catch (err) {
      next(err)
    }
  },
  putRecord: async(req, res, next) => {
    try {
      const { date, locationId, products } = req.body.data
      if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) return res.status(400).json({ status: 'error', message: '請確認輸入日期是否有效' })
      const record = await Record.findByPk(req.params.rid)
      if (!record) return res.status(400).json({ status: 'error', message: '查無該筆資料' })
      if (record.userId !== req.user.id) return res.status(400).json({ status: 'error', message: '權限不足'})
      const locationLists = await Location.findAll()
      const locationValid = locationLists.some(l => l.id === locationId)
      if(!locationValid) return res.status(400).json({ status: 'error', message: 'Location 資料錯誤'})
      const updatedRecord = await record.update({
        date,
        locationId
      })
      const updateRecordProducts = await products.map(product => {
        RecordedProduct.update({
          historyPrice: product.historyPrice,
          historyCost: product.historyCost,
          sendBack: product.sendBack,
          amount: product.amount
        }, {
          where: { id: product.id }
        })
      })
      res.status(200).json({ status: 'success', message: '資料修改成功' })
    } catch (err) {
      next(err)
    }
  },
  deleteRecord: async (req, res, next) => {
    try {
      const recordId = req.params.rid
      const deletedRecordedProduct = await RecordedProduct.destroy({ where: { recordId }})
      const record = await Record.findByPk(recordId)
      if (!record || !deletedRecordedProduct) return res.status(400).json({ status: 'error', message: '資料不存在' })
      if (record.userId !== req.user.id) return res.status(400).json({ status: 'error', message: '權限不足'})
      const deletedRecord = await record.destroy()
      return res.status(200).json({ status: 'success', deletedRecord, deletedRecordedProduct})
    } catch (err) {
      next(err)
    }
  },
}

module.exports = recordController