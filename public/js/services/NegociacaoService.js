/* request negociacoes data from server */
class NegociacaoService {

	constructor() {}

	importaSemana(callback) {
		this._get('/negociacoes/semana', callback)
	}

	importaAnterior(callback) {
		this._get('/negociacoes/anterior', callback)
	}

	importaRetrasada(callback) {
		this._get('/negociacoes/retrasada', callback)
	}

	/* send a get http request and callback result data */
	_get(url, callback) {
		let http = new XMLHttpRequest()
		http.open('GET', url)
		http.onreadystatechange = () => {
			if(http.readyState == XMLHttpRequest.DONE) { // request is done
				if(http.status == 200) { // status is ok
					let res = JSON.parse(http.responseText) // should return json string
					/* transform plain object to Negociacao */
					let negociacoes = res.map(n => new Negociacao(new Date(n.data), n.quantidade, n.valor))
					callback(false, negociacoes) // send error false and Negociacao object list
				} else {
					console.log(http.responseText)
					callback("Não foi possível obter as negociações", false)
				}
			}
		}
		http.send()
	}

}
