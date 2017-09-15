'use strict';

System.register(['../models/Negociacao', '../models/Mensagem', '../models/ListaNegociacoes', '../views/NegociacoesView', '../views/MensagemView', '../helpers/Bind', '../helpers/DateHelper', '../services/NegociacaoService'], function (_export, _context) {
	"use strict";

	var Negociacao, Mensagem, ListaNegociacoes, NegociacoesView, MensagemView, Bind, DateHelper, NegociacaoService, _createClass, NegociacaoController;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}, function (_modelsMensagem) {
			Mensagem = _modelsMensagem.Mensagem;
		}, function (_modelsListaNegociacoes) {
			ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
		}, function (_viewsNegociacoesView) {
			NegociacoesView = _viewsNegociacoesView.NegociacoesView;
		}, function (_viewsMensagemView) {
			MensagemView = _viewsMensagemView.MensagemView;
		}, function (_helpersBind) {
			Bind = _helpersBind.Bind;
		}, function (_helpersDateHelper) {
			DateHelper = _helpersDateHelper.DateHelper;
		}, function (_servicesNegociacaoService) {
			NegociacaoService = _servicesNegociacaoService.NegociacaoService;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacaoController', NegociacaoController = function () {
				function NegociacaoController() {
					_classCallCheck(this, NegociacaoController);

					var $ = document.querySelector.bind(document);

					this._$data = $('#data');
					this._$quantidade = $('#quantidade');
					this._$valor = $('#valor');

					/* there's no need to save views as attributes since
     we are using one way data binding - model changes updates view */
					this._listaNegociacoes = new Bind(new ListaNegociacoes() // this model
					, new NegociacoesView($('#negociacoes_view')) // updates this view
					, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem' // when this properties change
					);

					this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem_view')), 'texto');

					this._service = new NegociacaoService();
					this._ordenacao = ''; // field of Negociacao order listaNegociacoes

					this._init();
				}

				_createClass(NegociacaoController, [{
					key: '_init',
					value: function _init() {
						var _this = this;

						this._service.listaCadastradas().then(function (negociacoes) {
							return _this._listaNegociacoes.adicionaTodas(negociacoes);
						}).catch(function (error) {
							return _this._mensagem.texto = error;
						});
					}
				}, {
					key: 'adiciona',
					value: function adiciona(event) {
						var _this2 = this;

						event.preventDefault();

						var negociacao = this._criaNegociacao();

						this._service.cadastra(negociacao).then(function (mensagem) {
							_this2._listaNegociacoes.adiciona(negociacao);
							_this2._mensagem.texto = mensagem;
							_this2.limpaCampos();
						}).catch(function (error) {
							return _this2._mensagem.texto = error;
						});
					}
				}, {
					key: 'apagaTudo',
					value: function apagaTudo() {
						var _this3 = this;

						this._service.apagaTodas().then(function (mensagem) {
							_this3._listaNegociacoes.esvazia();
							_this3._mensagem.texto = mensagem;
						}).catch(function (error) {
							return _this3._mensagem.texto = error;
						});
					}
				}, {
					key: 'limpaCampos',
					value: function limpaCampos() {
						this._$data.value = "";
						this._$quantidade.value = 1;
						this._$valor.value = 0;
						this._$data.focus();
					}
				}, {
					key: 'importaNegociacoes',
					value: function importaNegociacoes() {
						var _this4 = this;

						this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
							_this4._listaNegociacoes.adicionaTodas(negociacoes);
							_this4._mensagem.texto = 'As negociações da semana foram importadas.';
						}).catch(function (error) {
							return _this4._mensagem.texto = error;
						});
					}
				}, {
					key: 'ordena',
					value: function ordena(coluna) {
						if (this._ordenacao === coluna) this._listaNegociacoes.inverteOrdem();else {
							this._ordenacao = coluna;
							this._listaNegociacoes.ordena(function (a, b) {
								return a[coluna] - b[coluna];
							});
						}
					}
				}, {
					key: '_criaNegociacao',
					value: function _criaNegociacao() {
						var dataStr = this._$data.value;
						var data = DateHelper.textoParaData(dataStr);
						var quantidade = this._$quantidade.value;
						var valor = this._$valor.value;
						return new Negociacao(data, quantidade, valor);
					}
				}]);

				return NegociacaoController;
			}());

			_export('NegociacaoController', NegociacaoController);
		}
	};
});
//# sourceMappingURL=NegociacaoController.js.map