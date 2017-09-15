'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, View;

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

			_export('View', View = function () {
				function View($elemento) {
					_classCallCheck(this, View);

					this._$elemento = $elemento;
				}

				_createClass(View, [{
					key: 'update',
					value: function update(model) {
						this._$elemento.innerHTML = this.template(model);
					}
				}, {
					key: 'template',
					value: function template(model) {
						throw new Error('You should implement the method View#template');
					}
				}]);

				return View;
			}());

			_export('View', View);
		}
	};
});
//# sourceMappingURL=View.js.map