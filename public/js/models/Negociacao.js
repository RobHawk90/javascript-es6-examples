/*
	see more about classes: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
*/
class Negociacao {

	construct(data, quantidade, valor) {
		this._data = data.getTime()
		this._quantidade = 1
		this._valor = 1
		Object.freeze(this) // prevent instances properties modifications
	}

	get data() {
		return new Date(this._data.getTime()) // prevent original date reference modifications
	}

	get quantidade() {
		return this._quantidade
	}

	get valor() {
		return this._valor
	}

	get volume() {
		return this._quantidade * this._valor
	}

}
