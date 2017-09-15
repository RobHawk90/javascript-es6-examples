import {Negociacao} from '../models/Negociacao'

/* abstracts all data manipulation from indexedDB store 'negociacoes' */
export class NegociacaoDAO {

	constructor(connection) {
		this._connection = connection
		this._store = 'negociacoes'
	}

	adiciona(negociacao) {
		return new Promise((resolve, reject) => {
			let addRequest = this._connection
				.transaction([this._store], 'readwrite') // init transaction
				.objectStore(this._store) // open store
				.add(negociacao) // try to add the object in store

			addRequest.onsuccess = () => resolve()
			addRequest.onerror = e => {
				console.log(e.target.error)
				reject('Não foi possível adicionar a negociacao.')
			}
		})
	}

	listaTodas() {
		return new Promise((resolve, reject) => {
			let negociacoes = []

			let cursor = this._connection
				.transaction([this._store], 'readonly')
				.objectStore(this._store)
				.openCursor() // returns an object for data reading iteration

			cursor.onsuccess = e => {
				let result = e.target.result // try to get actual result

				if(result) { // if is not the end of the cursor or there is data
					let value = result.value
					negociacoes.push(new Negociacao(new Date(value._data), value._quantidade, value._valor))
					result.continue() // move pointer to next possible result
				} else resolve(negociacoes) // cursor iteration ends
			}

			cursor.onerror = e => {
				console.log(e.target.error)
				reject('Não foi possível obter as negociações salvas.')
			}
		})
	}

	removeTodas() {
		return new Promise((resolve, reject) => {
			let clearRequest = this._connection
				.transaction([this._store], 'readwrite')
				.objectStore(this._store)
				.clear() // remove all data in store

			clearRequest.onsuccess = () => resolve()
			clearRequest.onerror = e => {
				console.log(e.target.error)
				reject('Não foi possível apagar as negociações.')
			}
		})
	}

}
