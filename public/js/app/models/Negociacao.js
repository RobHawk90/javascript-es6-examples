"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	see more about classes: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
*/
var Negociacao = function () {
	function Negociacao(data, quantidade, valor) {
		_classCallCheck(this, Negociacao);

		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this); // prevent instances properties modifications
	}

	_createClass(Negociacao, [{
		key: "equals",
		value: function equals(other) {
			return JSON.stringify(this) === JSON.stringify(other);
		}
	}, {
		key: "data",
		get: function get() {
			return new Date(this._data.getTime()); // prevent original date reference modifications
		}
	}, {
		key: "quantidade",
		get: function get() {
			return this._quantidade;
		}
	}, {
		key: "valor",
		get: function get() {
			return this._valor;
		}
	}, {
		key: "volume",
		get: function get() {
			return this._quantidade * this._valor;
		}
	}]);

	return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map