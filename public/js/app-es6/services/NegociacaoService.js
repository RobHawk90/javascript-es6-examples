import {Negociacao} from '../models/Negociacao'
import {NegociacaoDAO} from '../daos/NegociacaoDAO'
import {ConnectionFactory} from './ConnectionFactory'
import {HttpService} from './HttpService'

/* request negociacoes data from server */
export class NegociacaoService {

	constructor() {
		this._http = new HttpService()
	}

	importaSemana() {
		/* encapsulates HttpService.get Promise to return list of Negociacao instance */
		return new Promise((resolve, reject) => {
			this._http.get('/negociacoes/semana')
				.then(objects => {
					let negociacoes = objects.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
					resolve(negociacoes)
				})
				.catch(error => {
					console.log(error)
					reject("Não foi possível importar as negociações da semana")
				})
		})
	}

	importaAnterior() {
		return new Promise((resolve, reject) => {
			this._http.get('/negociacoes/anterior')
				.then(objects => {
					let negociacoes = objects.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
					resolve(negociacoes)
				})
				.catch(error => {
					console.log(error)
					reject("Não foi possível importar as negociações da semana")
				})
		})
	}

	importaRetrasada() {
		return new Promise((resolve, reject) => {
			this._http.get('/negociacoes/retrasada')
				.then(objects => {
					let negociacoes = objects.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
					resolve(negociacoes)
				})
				.catch(error => {
					console.log(error)
					reject("Não foi possível importar as negociações da semana")
				})
		})
	}

	importaTodas() {
		/* try to return all negociacoes from all services */
		return new Promise((resolve, reject) => {
			Promise.all([
				this.importaSemana()
				, this.importaAnterior()
				, this.importaRetrasada()
			]).then(results => { // the result of each promise
				/* group all negociacao */
				let negociacoes = results.reduce((allResult, thisResult) => allResult.concat(thisResult))
				resolve(negociacoes)
			}).catch(error => reject(error))
		})
	}

	importa(existentes) {
		return this.importaTodas()
			.then(negociacoes =>
				negociacoes.filter(negociacao =>
					!existentes.some(existente =>
						existente.equals(negociacao)
					)
				)
			)
	}

	cadastra(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDAO(connection))
			.then(dao => dao.adiciona(negociacao))
			.then(() => 'Negociação adicionada com sucesso!')
			.catch(error => { throw new Error('Não foi possível adicionar a negociação.') })
	}

	listaCadastradas() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDAO(connection))
			.then(dao => dao.listaTodas())
			.catch(error => { this._mensagem.texto = error })
	}

	apagaTodas() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDAO(connection))
			.then(dao => dao.removeTodas())
			.then(() => 'Todos as negociações foram apagadas!')
			.catch(error => { throw new Error('Não foi possível apagar as negociações.') })
	}

}
