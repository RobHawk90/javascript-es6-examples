import {ProxyFactory} from '../services/ProxyFactory'

export class Bind {

	constructor(model, view, ...props) {
		let update = () => view.update(model)

		/* Abstracting Proxy creation */
		let proxy = ProxyFactory.create(model, props, update)

		update()

		return proxy // Bind turns into Proxy, and Proxy encapsulates model
	}

}
