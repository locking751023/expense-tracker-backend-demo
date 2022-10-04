const { Location } = require('../models')

const locationController = {
  getLocations: async (req, res, next) => {
    try {
      const locations = await Location.findAll({ raw: true, nest: true })
      return res.status(200).json({ status: 'success', locations })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = locationController