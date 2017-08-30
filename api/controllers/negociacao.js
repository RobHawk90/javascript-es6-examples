/* just for http requests */
let api = {}

/* date setup - now, 7 and 14 days before */
let actualDate = new Date()
let lastWeek = new Date()
let twoWeeksAgo = new Date()
lastWeek.setDate(actualDate.getDate() - 7)
twoWeeksAgo.setDate(actualDate.getDate() - 14)

/* in memory list, just to test */
let negociacoes = [
    { data : actualDate, quantidade : 1, valor : 150 }
  , { data : actualDate, quantidade : 2, valor : 250 }
  , { data : actualDate, quantidade : 3, valor : 350 }
  , { data : lastWeek, quantidade : 1, valor : 450 }
  , { data : lastWeek, quantidade : 2, valor : 550 }
  , { data : lastWeek, quantidade : 3, valor : 650 }
  , { data : twoWeeksAgo, quantidade : 1, valor : 750 }
  , { data : twoWeeksAgo, quantidade : 2, valor : 950 }
  , { data : twoWeeksAgo, quantidade : 3, valor : 950 }
]


api.listThisWeek = function(req, res) {

  let thisWeek = negociacoes.filter(negociacao => negociacao.data > lastWeek)
  res.json(thisWeek)

}

api.listLastWeek = function(req, res) {

  let lastWeek = negociacoes.filter(negociacao => negociacao.data < actualDate && negociacao.data > twoWeeksAgo)
	setTimeout(() => res.json(lastWeek), 500)  // do NOT do it in prod, it's just to test assync requests

}

api.listTwoWeeksAgo = function(req, res) {

  let negociacoesRtrasadas = negociacoes.filter(negociacao => negociacao.data < lastWeek)
  res.json(negociacoesRtrasadas)
    
}

api.save = function(req, res) {
  
  console.log(req.body)
  req.body.data = new Date(req.body.data.replace(/-/g,'/'))
  negociacoes.push(req.body)
  res.status(200).json("Salvo com sucesso!")

}

module.exports = api;
