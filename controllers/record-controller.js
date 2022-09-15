const recordController = {
  getRecords: (req, res) => {
    return res.send('getRecords')
  },
  getRecord: (req, res) => {
    return res.send(`Record:${req.params.rid}`)
  },
  addRecord: (req, res) => {
    return res.send('POST Add new record')
  },
  postRecord: (req, res) => {
    return res.send(`POST Edit record:${req.params.rid}`)
  },
  deleteRecord: (req, res) => {
    return res.send(`DELETE Record:${req.params.rid}`)
  },
  
}

module.exports = recordController