class ListaNegociacoes {

	constructor(observer) {
		this._negociacoes = []
		this._observer = observer // must be invoked when this model change
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao)
		this._observer(this) // the view will be updated
	}

	esvazia() {
		this._negociacoes = []
		this._observer(this)
	}

	get negociacoes() {
		return [].concat(... this._negociacoes) // returns a copy of "negociacoes"
	}

}
