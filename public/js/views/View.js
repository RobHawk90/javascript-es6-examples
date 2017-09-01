class View {

	constructor($elemento) {
		this._$elemento = $elemento
	}

	update(model) {
		this._$elemento.innerHTML = this.template(model)
	}

	template(model) {
		throw new Error('You should implement the method View#template')
	}

}
