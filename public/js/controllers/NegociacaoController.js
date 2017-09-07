class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document)

		this._$data = $('#data')
		this._$quantidade = $('#quantidade')
		this._$valor = $('#valor')

		/* there's no need to save views as attributes since
		we are using one way data binding - model changes updates view */
		this._listaNegociacoes = new Bind(
			new ListaNegociacoes() // this model
			, new NegociacoesView($('#negociacoes_view')) // updates this view
			, 'adiciona', 'esvazia' // when this properties change
		)

		this._mensagem = new Bind(
			new Mensagem()
			, new MensagemView($('#mensagem_view'))
			, 'texto'
		)
	}

	adiciona(event) {
		event.preventDefault()

		this._listaNegociacoes.adiciona(this._criaNegociacao())
		this._mensagem.texto = 'Item incluido com sucesso!'

		this.limpaCampos()
	}

	apagaTudo() {
		this._listaNegociacoes.esvazia()
		this._mensagem.texto = 'Todos os itens foram apagados.'
	}

	limpaCampos() {
		this._$data.value = ""
		this._$quantidade.value = 1
		this._$valor.value = 0
		this._$data.focus()
	}

	importaNegociacoes() {
		let service = new NegociacaoService()
		service.importaSemana((err, negociacoes) => {
			if(err) { // show errors and interrupt if exists
				this._mensagem.texto = err
				return
			}

			/* add all object result need to be refactored */
			negociacoes.forEach(n => this._listaNegociacoes.adiciona(n))

			this._mensagem.texto = 'As negociações da semana foram importadas.';
		})
	}

	_criaNegociacao() {
		let dataStr = this._$data.value;
		let data = DateHelper.textoParaData(dataStr)
		let quantidade = this._$quantidade.value
		let valor = this._$valor.value
		return new Negociacao(data, quantidade, valor)
	}

}
