class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document)
		this._$data = $('#data')
		this._$quantidade = $('#quantidade')
		this._$valor = $('#valor')
	}

	adiciona(event) {
		event.preventDefault()
		let negociacao = this._getNegociacao()
		this.limpaCampos()
		console.log(negociacao)
	}

	limpaCampos() {
		this._$data.value = ""
		this._$quantidade.value = 1
		this._$valor.value = 0
		this._$data.focus()
	}

	_getNegociacao() {
		let dataStr = this._$data.value;
		let formattedDataStr = dataStr.split('/').reverse().join('/')
		let data = new Date(formattedDataStr)
		let quantidade = this._$quantidade.value
		let valor = this._$valor.value
		return new Negociacao(data, quantidade, valor)
	}

}
