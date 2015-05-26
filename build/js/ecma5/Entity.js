define(["exports", "module", "jquery", "jqueryEasing", "Engine", "css!/css/Entity.css"], function (exports, module, _jquery, _jqueryEasing, _Engine, _cssCssEntityCss) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _$ = _interopRequireDefault(_jquery);

	var _jqueryEasing2 = _interopRequireDefault(_jqueryEasing);

	var _Engine2 = _interopRequireDefault(_Engine);

	var transitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
	var animationEnd = "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend";

	var Entity = (function () {
		function Entity(options) {
			_classCallCheck(this, Entity);

			this.size = {
				width: 30,
				height: 30
			};
			this.jumps = 0;
			this.entType = Entity.types.TYPE1;
			this.tagName = "div";
			this.bindEvents();
			this.ground = 194.5;
			this.gravity = _Engine2["default"].instance.gravity;
			this.velocityY = 0;
			this.velocityX = 0;
			Object.assign(this, options);
			_Engine2["default"].instance.addEntity(this);
		}

		_createClass(Entity, [{
			key: "onGoingDown",
			value: function onGoingDown() {
				this.$el.removeClass("up");
				this.$el.addClass("down");
			}
		}, {
			key: "onGoingUp",
			value: function onGoingUp() {
				this.$el.removeClass("down");
				this.$el.addClass("up");
			}
		}, {
			key: "onStill",
			value: function onStill() {
				this.$el.removeClass("up down");
			}
		}, {
			key: "update",
			value: function update() {

				// let ground = 194.5;
				this.velocityY !== 0 && (this.velocityY += this.gravity);
				this.positionY = this.positionY + this.velocityY;
				this.positionX = this.positionX + this.velocityX;

				if (this.positionY > this.ground) {
					this.positionY = this.ground;
					this.velocityY = 0;
				}
			}
		}, {
			key: "jump",
			value: function jump() {
				this.velocityY = -1;
			}
		}, {
			key: "isStationaryY",
			set: function (value) {
				this._isStationaryY = value;
				if (this._isStationaryY) {
					this.velocityY = 0;
				}
			}
		}, {
			key: "velocityY",
			set: function (value) {

				console.log(this.size.width, value);
				// this.$el.width();

				this._velocityY = value;
			},
			get: function () {
				return this._velocityY;
			}
		}, {
			key: "top",
			get: function () {
				return this.$el.position().top;
			}
		}, {
			key: "bottom",
			get: function () {
				return this.positionY + this.height();
			}
		}, {
			key: "positionX",
			set: function (value) {
				this.$el.css({ left: this._positionX });
			},
			get: function () {
				return this.$el.position().left;
			}
		}, {
			key: "positionY",
			get: function () {
				return this.$el.position().top;
			},
			set: function (value) {

				if (value > this._positionY) {
					this.onGoingDown();
				} else if (value < this._positionY) {
					this.onGoingUp();
				} else {
					this.onStill();
				}

				this._positionY = value;
				this.$el.css({ top: this._positionY });
			}
		}, {
			key: "bindEvents",
			value: function bindEvents() {
				var _this = this;

				(0, _$["default"])(document).on("keypress." + this.constructor.name, function (event) {
					if (event.keyCode == 32) {
						_this.jumps++;
						_this.jump();
					}
				});
			}
		}, {
			key: "render",
			value: function render() {
				return this;
			}
		}, {
			key: "type",
			set: function (value) {
				this._entType = value;
			}
		}, {
			key: "tagName",
			set: function (value) {
				this._tagName = value;
				this.el = document.createElement(this._tagName);
				this.el.className = this.constructor.name + " " + this.entType;
				this.$el = (0, _$["default"])(this.el).width(this.size.width).height(this.size.height);
			}
		}], [{
			key: "types",
			get: function () {
				return {
					TYPE1: "TYPE1", // A primary element, will be position fixed
					TYPE2: "TYPE2" // A secondar element, will be position relative
				};
			}
		}]);

		return Entity;
	})();

	module.exports = Entity;
});
//# sourceMappingURL=Entity.js.map