const userController = {
  login: (req, res) => {
    res.send('POST Login page')
  },
  register: (req, res) => {
    res.send('POST Register page')
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/api/login')
  }
}

module.exports = userController