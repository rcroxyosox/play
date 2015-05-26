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
	var keyMappings = {
		32: "SPACEBAR",
		37: "LEFT",
		39: "RIGHT",
		38: "UP",
		40: "DOWN"
	};
	var directions = {
		NONE: "NONE",
		UP: "UP",
		DOWN: "DOWN",
		LEFT: "LEFT",
		RIGHT: "RIGHT"
	};

	var Entity = (function () {
		function Entity(options) {
			_classCallCheck(this, Entity);

			this.direction = {
				x: directions.NONE,
				y: directions.NONE
			};
			this.size = {
				width: 30,
				height: 30
			};
			this.el = null;
			this.$el = (0, _$["default"])();
			this.jumps = 0;
			this.entType = Entity.types.TYPE1;
			this.tagName = "div";
			this.bindEvents();
			this.ground = 194.5;
			this.gravity = _Engine2["default"].instance.gravity;
			this.friction = _Engine2["default"].instance.friction;
			this.velocityY = 0;
			this.velocityX = 0;
			Object.assign(this, options);
			_Engine2["default"].instance.addEntity(this);
		}

		_createClass(Entity, [{
			key: "direction",
			get: function () {
				return this._direction;
			},
			set: function (value) {
				var _this = this;

				var actions = {
					UP: function UP() {
						_this.$el.removeClass("down").addClass("up");
					},
					DOWN: function DOWN() {
						_this.$el.removeClass("up").addClass("down");
					},
					LEFT: function LEFT() {
						_this.$el.removeClass("right").addClass("left");
					},
					RIGHT: function RIGHT() {
						_this.$el.removeClass("left").addClass("right");
					},
					NONE: function NONE(axis) {
						if (axis == "x") {
							_this.$el && _this.$el.removeClass("left right");
						} else {
							_this.$el && _this.$el.removeClass("up down");
						}
					}
				};

				value.x && actions[value.x] && actions[value.x]("x");
				value.y && actions[value.y] && actions[value.y]("y");
				this._direction = value;
			}
		}, {
			key: "update",
			value: function update() {

				this.velocityY !== 0 && (this.velocityY += this.gravity);
				this.velocityX !== 0 && (this.velocityX += this.friction);

				this.positionY = this.positionY + this.velocityY;
				this.positionX = this.direction.x == directions.LEFT ? this.positionX + this.velocityX : this.positionX - this.velocityX;

				if (this.direction.x == directions.LEFT && this.velocityX > 0 || this.direction.x == directions.RIGHT && this.velocityX > 0) {
					this.direction.x = directions.NONE;
					this.velocityX = 0;
				}

				if (this.positionY > this.ground) {
					this.positionY = this.ground;
					this.velocityY = 0;
				}
			}
		}, {
			key: "jump",
			value: function jump() {
				this.jumps++;
				this.velocityY = -4;
			}
		}, {
			key: "goLeft",
			value: function goLeft() {
				this.direction.x = directions.LEFT;
				this.velocityX = -3.5;
			}
		}, {
			key: "goRight",
			value: function goRight() {
				this.direction.x = directions.RIGHT;
				this.velocityX = -3.5;
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
				this.$el.css({
					left: value
				});
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
				var d = this.direction;
				if (value > this.positionY) {
					d.y = directions.DOWN;
				} else if (value < this.positionY) {
					d.y = directions.UP;
				} else {
					d.y = directions.NONE;
				}

				this.direction = d;
				this.$el.css({
					top: value
				});
			}
		}, {
			key: "bindEvents",
			value: function bindEvents() {
				var _this2 = this;

				(0, _$["default"])(document).on("keydown." + this.constructor.name, function (event) {

					console.log(event.keyCode);

					var key = keyMappings[event.keyCode];
					var actions = {
						"LEFT": function LEFT() {
							_this2.goLeft();
						},
						"RIGHT": function RIGHT() {
							_this2.goRight();
						},
						"UP": function UP() {
							_this2.jump();
						},
						"SPACEBAR": function SPACEBAR() {
							_this2.jump();
						}
					};

					actions[key] && actions[key]();
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