'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* request negociacoes data from server */
var NegociacaoService = function () {
	function NegociacaoService() {
		_classCallCheck(this, NegociacaoService);

		this._http = new HttpService();
	}

	_createClass(NegociacaoService, [{
		key: 'importaSemana',
		value: function importaSemana() {
			var _this = this;

			/* encapsulates HttpService.get Promise to return list of Negociacao instance */
			return new Promise(function (resolve, reject) {
				_this._http.get('/negociacoes/semana').then(function (objects) {
					var negociacoes = objects.map(function (obj) {
						return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
					});
					resolve(negociacoes);
				}).catch(function (error) {
					console.log(error);
					reject("Não foi possível importar as negociações da semana");
				});
			});
		}
	}, {
		key: 'importaAnterior',
		value: function importaAnterior() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2._http.get('/negociacoes/anterior').then(function (objects) {
					var negociacoes = objects.map(function (obj) {
						return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
					});
					resolve(negociacoes);
				}).catch(function (error) {
					console.log(error);
					reject("Não foi possível importar as negociações da semana");
				});
			});
		}
	}, {
		key: 'importaRetrasada',
		value: function importaRetrasada() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3._http.get('/negociacoes/retrasada').then(function (objects) {
					var negociacoes = objects.map(function (obj) {
						return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
					});
					resolve(negociacoes);
				}).catch(function (error) {
					console.log(error);
					reject("Não foi possível importar as negociações da semana");
				});
			});
		}
	}, {
		key: 'importaTodas',
		value: function importaTodas() {
			var _this4 = this;

			/* try to return all negociacoes from all services */
			return new Promise(function (resolve, reject) {
				Promise.all([_this4.importaSemana(), _this4.importaAnterior(), _this4.importaRetrasada()]).then(function (results) {
					// the result of each promise
					/* group all negociacao */
					var negociacoes = results.reduce(function (allResult, thisResult) {
						return allResult.concat(thisResult);
					});
					resolve(negociacoes);
				}).catch(function (error) {
					return reject(error);
				});
			});
		}
	}, {
		key: 'importa',
		value: function importa(existentes) {
			return this.importaTodas().then(function (negociacoes) {
				return negociacoes.filter(function (negociacao) {
					return !existentes.some(function (existente) {
						return existente.equals(negociacao);
					});
				});
			});
		}
	}, {
		key: 'cadastra',
		value: function cadastra(negociacao) {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDAO(connection);
			}).then(function (dao) {
				return dao.adiciona(negociacao);
			}).then(function () {
				return 'Negociação adicionada com sucesso!';
			}).catch(function (error) {
				throw new Error('Não foi possível adicionar a negociação.');
			});
		}
	}, {
		key: 'listaCadastradas',
		value: function listaCadastradas() {
			var _this5 = this;

			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDAO(connection);
			}).then(function (dao) {
				return dao.listaTodas();
			}).catch(function (error) {
				_this5._mensagem.texto = error;
			});
		}
	}, {
		key: 'apagaTodas',
		value: function apagaTodas() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDAO(connection);
			}).then(function (dao) {
				return dao.removeTodas();
			}).then(function () {
				return 'Todos as negociações foram apagadas!';
			}).catch(function (error) {
				throw new Error('Não foi possível apagar as negociações.');
			});
		}
	}]);

	return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map