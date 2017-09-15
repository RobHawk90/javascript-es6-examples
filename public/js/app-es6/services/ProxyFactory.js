export class ProxyFactory {

	constructor() { throw new Error("ProxyFactory is static and can't be instancied.") }

	static create(model, props, callback) {
		return new Proxy(model, {
			get: (target, prop, receiver) => {
				/* if prop is a prop that changes the view */
				if(props.includes(prop) && ProxyFactory._isFunction(target, prop)) {
					return function() {
						/* arguments is auto injected in function() {}; changing its state */
						let result = Reflect.apply(target[prop], target, arguments)
						callback() // updating the view
						return result // returning model state
					}
				}
				return Reflect.get(target, prop, receiver)
			},
			set: (target, prop, value, receiver) => {
				let result = Reflect.set(target, prop, value, receiver)
				if(props.includes(prop)) callback()
				return result
			}
		})
	}

	/* verify if the target's prop is a function */
	static _isFunction(target, prop) {
		return typeof(target[prop]) === typeof(Function)
	}

}
