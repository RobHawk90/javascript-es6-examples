"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _typeof, _createClass, ProxyFactory;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};

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

			_export("ProxyFactory", ProxyFactory = function () {
				function ProxyFactory() {
					_classCallCheck(this, ProxyFactory);

					throw new Error("ProxyFactory is static and can't be instancied.");
				}

				_createClass(ProxyFactory, null, [{
					key: "create",
					value: function create(model, props, callback) {
						return new Proxy(model, {
							get: function get(target, prop, receiver) {
								/* if prop is a prop that changes the view */
								if (props.includes(prop) && ProxyFactory._isFunction(target, prop)) {
									return function () {
										/* arguments is auto injected in function() {}; changing its state */
										var result = Reflect.apply(target[prop], target, arguments);
										callback(); // updating the view
										return result; // returning model state
									};
								}
								return Reflect.get(target, prop, receiver);
							},
							set: function set(target, prop, value, receiver) {
								var result = Reflect.set(target, prop, value, receiver);
								if (props.includes(prop)) callback();
								return result;
							}
						});
					}
				}, {
					key: "_isFunction",
					value: function _isFunction(target, prop) {
						return _typeof(target[prop]) === (typeof Function === "undefined" ? "undefined" : _typeof(Function));
					}
				}]);

				return ProxyFactory;
			}());

			_export("ProxyFactory", ProxyFactory);
		}
	};
});
//# sourceMappingURL=ProxyFactory.js.map