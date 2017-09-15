'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, stores, version, dbName, connection, close, ConnectionFactory;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
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

			stores = ['negociacoes'];
			version = 4;
			dbName = 'exemplo';
			connection = null;
			close = null;

			_export('ConnectionFactory', ConnectionFactory = function () {
				function ConnectionFactory() {
					_classCallCheck(this, ConnectionFactory);

					throw new Error("ConnectionFactory is a static class and can't be instancied.");
				}

				_createClass(ConnectionFactory, null, [{
					key: 'getConnection',
					value: function getConnection() {
						return new Promise(function (resolve, reject) {

							var openRequest = window.indexedDB.open(dbName, version);

							openRequest.onupgradeneeded = function (e) {
								ConnectionFactory._createStores(e.target.result);
							};

							openRequest.onsuccess = function (e) {
								if (!connection) {
									// if connection not already exists...
									connection = e.target.result;
									/* only ConnectionFactory.closeConnection() can close the indexedDB connection */
									close = connection.close.bind(connection); // we store close function to call it later
									connection.close = function () {
										// alter default implementation (monkey patch)
										throw new Error('To close connections, call ConnectionFactory.closeConnection()');
									};
								}
								resolve(connection); // THEN CALL
							};

							openRequest.onerror = function (e) {
								console.log(e.target.error);
								reject(e.target.error.name); // CATCH CALL
							};
						});
					}
				}, {
					key: 'closeConnection',
					value: function closeConnection() {
						close();
						connection = null;
					}
				}, {
					key: '_createStores',
					value: function _createStores(connection) {
						stores.forEach(function (store) {
							if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
							connection.createObjectStore(store, { autoIncrement: true });
						});
					}
				}]);

				return ConnectionFactory;
			}());

			_export('ConnectionFactory', ConnectionFactory);
		}
	};
});
//# sourceMappingURL=ConnectionFactory.js.map