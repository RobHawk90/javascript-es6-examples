/* we need to enhance our indexedDB connection creation, so here we go */
/* these variables are hidden to external access */
const stores = ['negociacoes']
const version = 4
const dbName = 'exemplo'

let connection = null
let close = null

/* Only this class can be visible, because it is returned and stored */
export class ConnectionFactory {

	constructor() {
		throw new Error("ConnectionFactory is a static class and can't be instancied.")
	}

	static getConnection() {
		return new Promise((resolve, reject) => {

			let openRequest = window.indexedDB.open(dbName, version)

			openRequest.onupgradeneeded = e => {
				ConnectionFactory._createStores(e.target.result)
			}

			openRequest.onsuccess = e => {
				if(!connection) { // if connection not already exists...
					connection = e.target.result
					/* only ConnectionFactory.closeConnection() can close the indexedDB connection */
					close = connection.close.bind(connection) // we store close function to call it later
					connection.close = function() { // alter default implementation (monkey patch)
						throw new Error('To close connections, call ConnectionFactory.closeConnection()')
					}
				}
				resolve(connection) // THEN CALL
			}

			openRequest.onerror = e => {
				console.log(e.target.error)
				reject(e.target.error.name) // CATCH CALL
			}

		})
	}

	/* close indexedDB singleton connection */
	static closeConnection() {
		close()
		connection = null
	}

	/* abstracting stores creation */
	static _createStores(connection) {
		stores.forEach(store => {
			if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store)
			connection.createObjectStore(store, {autoIncrement: true})
		})
	}

}
