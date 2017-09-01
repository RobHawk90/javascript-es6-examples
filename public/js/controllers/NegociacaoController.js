class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document)

		this._$data = $('#data')
		this._$quantidade = $('#quantidade')
		this._$valor = $('#valor')

		this._listaNegociacoes = new ListaNegociacoes()
		this._mensagem = new Mensagem()

		this._mensagemView = new MensagemView($('#mensagem_view'))
		this._negociacoesView = new NegociacoesView($('#negociacoes_view'))

		this._negociacoesView.update(this._listaNegociacoes)
		this._mensagemView.update(this._mensagem)
	}

	adiciona(event) {
		event.preventDefault()

		this._listaNegociacoes.adiciona(this._criaNegociacao())
		this._mensagem.texto = 'Item incluido com sucesso!'

		this._negociacoesView.update(this._listaNegociacoes)
		this._mensagemView.update(this._mensagem)

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
