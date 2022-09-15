const adminController = {
  getProducts: (req, res) => {
    return res.send('Show all Product')
  },
  addProduct: (req, res) => {
    return res.send('Add product')
  },
  editProduct: (req, res) => {
    return res.send(`Maintain product:${req.params.pid}`)
  },
  deleteProduct: (req, res) => {
    return res.send(`Delete product:${req.params.pid}`)
  },
  getUsers: (req, res) => {
    return res.send('Show all Users')
  },
  deleteUser: (req, res) => {
    return res.send(`Delete user:${req.params.uid}`)
  },
  getRecords: (req, res) => {
    return res.send('Show all Records')
  },
  deleteRecord: (req, res) => {
    return res.send(`Delete record:${req.params.rid}`)
  }
}

module.exports = adminController