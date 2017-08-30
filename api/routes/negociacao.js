/* simple routes, just to test the main code */
let api = require('../controllers/negociacao')

module.exports = app => {

  app.get('/negociacoes/semana', api.listThisWeek)
  	 .get('/negociacoes/anterior', api.listLastWeek)
  	 .get('/negociacoes/retrasada', api.listTwoWeeksAgo)
  	 .post('/negociacoes', api.save)

}
