/*
	see more about classes: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
*/
export class Negociacao {

	constructor(data, quantidade, valor) {
		this._data = new Date(data.getTime())
		this._quantidade = quantidade
		this._valor = valor
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

	equals(other) {
		return JSON.stringify(this) === JSON.stringify(other)
	}

}
