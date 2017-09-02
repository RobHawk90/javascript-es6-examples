class Mensagem {

	constructor(observer, texto = '') {
		this._observer = observer
		this._texto = texto
	}

	get texto() {
		return this._texto
	}

	set texto(texto) {
		this._texto = texto
		this._observer(this)
	}

}
