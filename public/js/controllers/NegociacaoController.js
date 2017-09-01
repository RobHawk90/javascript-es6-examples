class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document)
		this._$data = $('#data')
		this._$quantidade = $('#quantidade')
		this._$valor = $('#valor')

		this._listaNegociacoes = new ListaNegociacoes()

		this._$view = new NegociacoesView($('#negociacoes_view'))
		this._$view.update(this._listaNegociacoes)
	}

	adiciona(event) {
		event.preventDefault()
		this._listaNegociacoes.adiciona(this._criaNegociacao())
		this._$view.update(this._listaNegociacoes)
		this.limpaCampos()
	}

	limpaCampos() {
		this._$data.value = ""
		this._$quantidade.value = 1
		this._$valor.value = 0
		this._$data.focus()
	}

	_criaNegociacao() {
		let dataStr = this._$data.value;
		let data = DateHelper.textoParaData(dataStr)
		let quantidade = this._$quantidade.value
		let valor = this._$valor.value
		return new Negociacao(data, quantidade, valor)
	}

}