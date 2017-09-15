'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
	"use strict";

	var Negociacao, _createClass, NegociacaoDAO;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
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

			_export('NegociacaoDAO', NegociacaoDAO = function () {
				function NegociacaoDAO(connection) {
					_classCallCheck(this, NegociacaoDAO);

					this._connection = connection;
					this._store = 'negociacoes';
				}

				_createClass(NegociacaoDAO, [{
					key: 'adiciona',
					value: function adiciona(negociacao) {
						var _this = this;

						return new Promise(function (resolve, reject) {
							var addRequest = _this._connection.transaction([_this._store], 'readwrite') // init transaction
							.objectStore(_this._store) // open store
							.add(negociacao); // try to add the object in store

							addRequest.onsuccess = function () {
								return resolve();
							};
							addRequest.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível adicionar a negociacao.');
							};
						});
					}
				}, {
					key: 'listaTodas',
					value: function listaTodas() {
						var _this2 = this;

						return new Promise(function (resolve, reject) {
							var negociacoes = [];

							var cursor = _this2._connection.transaction([_this2._store], 'readonly').objectStore(_this2._store).openCursor(); // returns an object for data reading iteration

							cursor.onsuccess = function (e) {
								var result = e.target.result; // try to get actual result

								if (result) {
									// if is not the end of the cursor or there is data
									var value = result.value;
									negociacoes.push(new Negociacao(new Date(value._data), value._quantidade, value._valor));
									result.continue(); // move pointer to next possible result
								} else resolve(negociacoes); // cursor iteration ends
							};

							cursor.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível obter as negociações salvas.');
							};
						});
					}
				}, {
					key: 'removeTodas',
					value: function removeTodas() {
						var _this3 = this;

						return new Promise(function (resolve, reject) {
							var clearRequest = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear(); // remove all data in store

							clearRequest.onsuccess = function () {
								return resolve();
							};
							clearRequest.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível apagar as negociações.');
							};
						});
					}
				}]);

				return NegociacaoDAO;
			}());

			_export('NegociacaoDAO', NegociacaoDAO);
		}
	};
});
//# sourceMappingURL=NegociacaoDAO.js.map