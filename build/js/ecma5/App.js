define(["exports", "module", "jquery", "Entity"], function (exports, module, _jquery, _Entity) {
	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _$ = _interopRequireDefault(_jquery);

	var _Entity2 = _interopRequireDefault(_Entity);

	var App = {
		start: function start() {
			var ent = new _Entity2["default"]({ gravity: 0.01 });
			(0, _$["default"])("body").append(ent.render().$el);
		}
	};

	module.exports = App;
});
//# sourceMappingURL=App.js.map