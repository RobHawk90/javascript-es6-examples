"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = function Bind(model, view) {
		_classCallCheck(this, Bind);

		var update = function update() {
				return view.update(model);
		};

		/* Abstracting Proxy creation */

		for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				props[_key - 2] = arguments[_key];
		}

		var proxy = ProxyFactory.create(model, props, update);

		update();

		return proxy; // Bind turns into Proxy, and Proxy encapsulates model
};
//# sourceMappingURL=Bind.js.map