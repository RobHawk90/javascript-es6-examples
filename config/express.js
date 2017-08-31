/* bootstraping app */

/* importing some files and dependencies */
let express = require('express')
  , app = express()
  , routes = require('../api/routes/negociacao')
  , path = require('path')
  , bodyParser = require('body-parser')

/* setting some config */
let publicPath = path.join(__dirname, '../', 'public')
console.log(publicPath)
app.use(express.static(publicPath))
app.use(bodyParser.json())

/* trying to solve CORS problem */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

routes(app) // routes config delegation

module.exports = app
