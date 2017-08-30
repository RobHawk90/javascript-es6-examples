let http = require('http')
  , app = require('./config/express')

let port = process.env.PORT || 3000

http.createServer(app).listen(3000, () => console.log(`Server is running on port ${port}`))
