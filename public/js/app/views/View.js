'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
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
}();
//# sourceMappingURL=View.js.map