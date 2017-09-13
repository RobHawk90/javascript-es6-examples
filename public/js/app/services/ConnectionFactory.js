'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* we need to enhance our indexedDB connection creation, so here we go */
var ConnectionFactory = function () {
	// init module pattern
	/* these variables are hidden to external access */
	var stores = ['negociacoes'];
	var version = 4;
	var dbName = 'exemplo';

	var connection = null;
	var close = null;

	/* Only this class can be visible, because it is returned and stored */
	return function () {
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

			/* close indexedDB singleton connection */

		}, {
			key: 'closeConnection',
			value: function closeConnection() {
				close();
				connection = null;
			}

			/* abstracting stores creation */

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
	}();
}(); // end module pattern
//# sourceMappingURL=ConnectionFactory.js.map