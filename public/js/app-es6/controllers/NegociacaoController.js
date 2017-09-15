import {Negociacao} from '../models/Negociacao'
import {Mensagem} from '../models/Mensagem'
import {ListaNegociacoes} from '../models/ListaNegociacoes'
import {NegociacoesView} from '../views/NegociacoesView'
import {MensagemView} from '../views/MensagemView'
import {Bind} from '../helpers/Bind'
import {DateHelper} from '../helpers/DateHelper'
import {NegociacaoService} from '../services/NegociacaoService'

export class NegociacaoController {

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
			, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem' // when this properties change
		)

		this._mensagem = new Bind(
			new Mensagem()
			, new MensagemView($('#mensagem_view'))
			, 'texto'
		)

		this._service = new NegociacaoService()
		this._ordenacao = '' // field of Negociacao order listaNegociacoes

		this._init();
	}

	_init() {
		this._service.listaCadastradas()
			.then(negociacoes => this._listaNegociacoes.adicionaTodas(negociacoes))
			.catch(error => this._mensagem.texto = error)
	}

	adiciona(event) {
		event.preventDefault()

		let negociacao = this._criaNegociacao()

		this._service.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao)
				this._mensagem.texto = mensagem
				this.limpaCampos()
			})
			.catch(error => this._mensagem.texto = error)
	}

	apagaTudo() {
		this._service.apagaTodas()
			.then(mensagem => {
				this._listaNegociacoes.esvazia()
				this._mensagem.texto = mensagem
			})
			.catch(error => this._mensagem.texto = error)
	}

	/* setting default values for each element */
	limpaCampos() {
		this._$data.value = ""
		this._$quantidade.value = 1
		this._$valor.value = 0
		this._$data.focus()
	}

	importaNegociacoes() {
		this._service.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes => {
				this._listaNegociacoes.adicionaTodas(negociacoes)
				this._mensagem.texto = 'As negociações da semana foram importadas.';
			})
			.catch(error => this._mensagem.texto = error)
	}

	ordena(coluna) {
		if(this._ordenacao === coluna)
			this._listaNegociacoes.inverteOrdem()
		else {
			this._ordenacao = coluna
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
	}

	/* retrieving form data */
	_criaNegociacao() {
		let dataStr = this._$data.value;
		let data = DateHelper.textoParaData(dataStr)
		let quantidade = this._$quantidade.value
		let valor = this._$valor.value
		return new Negociacao(data, quantidade, valor)
	}

}
