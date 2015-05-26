define(["exports", "module"], function (exports, module) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engine = (function () {
		function Engine(options) {
			_classCallCheck(this, Engine);

			this.entities = [];
			this.friction = 0.06;
			this.gravity = 0.06;
			this.framerate = 0;
			this.loop();
		}

		_createClass(Engine, [{
			key: "addEntity",
			value: function addEntity(entity) {
				this.entities.push(entity);
			}
		}, {
			key: "loop",
			value: function loop() {
				var _this = this;

				var loopInt = setInterval(function () {
					for (var k in _this.entities) {
						if (_this.entities[k].update) {
							_this.entities[k].update();
						} else {
							console.error("No update set for " + k);
							clearInterval(loopInt);
						}
					}
				}, this.framerate);
			}
		}], [{
			key: "instance",
			get: function () {
				return engine;
			}
		}]);

		return Engine;
	})();

	var engine = new Engine();
	module.exports = Engine;
});
//# sourceMappingURL=Engine.js.map