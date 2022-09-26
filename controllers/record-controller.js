const { Record, Location, RecordedProduct } = require('../models')
const { Op, and } = require('sequelize')
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
        include: [Location, RecordedProduct]
      })
      return res.status(200).json({ status: 'success', record })
    } catch (err) {
      next(err)
    }
  },
  addRecord: async (req, res, next) => {
    try {
      if (!req.body.data) return res.status(400).json({ status: 'error', message: 'req.body.data 資料不存在' })
      const { date, locationId, products } = req.body.data
      if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) return res.status(400).json({ status: 'error', message: '請確認輸入日期是否有效' })
      const record = await Record.create({
        date,
        userId: req.user.id,
        locationId
      })
      const productWithRecordId = products.map(product => ({
        ...product,
        recordId: record.id
      }))
      const recordedProducts = await RecordedProduct.bulkCreate(productWithRecordId)
      return res.status(200).json({ status: 'success', record, recordedProducts })
    } catch (err) {
      next(err)
    }
  },
  putRecord: async(req, res, next) => {
    try {
      const { date, locationId, products } = req.body.data
      if (!req.body.data) return res.status(400).json({ status: 'error', message: 'req.body.data 資料不存在' })
      if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) return res.status(400).json({ status: 'error', message: '請確認輸入日期是否有效' })
      const record = await Record.findByPk(req.params.rid)
      if (!record) return res.status(400).json({ status: 'error', message: '查無該筆資料' })
      const locationLists = await Location.findAll({ raw: true, nest: true})
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
      const deletedRecord = await record.destroy()
      return res.status(200).json({ status: 'success', deletedRecord, deletedRecordedProduct})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = recordController