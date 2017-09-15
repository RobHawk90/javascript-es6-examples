'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, DateHelper;

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

			_export('DateHelper', DateHelper = function () {
				function DateHelper() {
					_classCallCheck(this, DateHelper);

					throw new Error("DateHelper is static and can't be instanciated");
				}

				_createClass(DateHelper, null, [{
					key: 'textoParaData',
					value: function textoParaData(dateStr) {
						if (dateStr && dateStr.indexOf('/') > -1) // probably in ptBR format
							dateStr = dateStr.split('/').reverse().join('-'); // converts to valid Date format convertion
						if (/\d{4}-\d{2}-\d{2}/.test(dateStr)) // simple date regex validation
							return new Date(dateStr);
						throw new Error('The date "' + dateStr + '" should be in "yyyy-mm-dd" format');
					}
				}, {
					key: 'dataParaTexto',
					value: function dataParaTexto(date) {
						if (!date) return '';
						var dateTime = date.toISOString().split('T');
						return dateTime[0].split('-').reverse().join('/');
					}
				}]);

				return DateHelper;
			}());

			_export('DateHelper', DateHelper);
		}
	};
});
//# sourceMappingURL=DateHelper.js.map