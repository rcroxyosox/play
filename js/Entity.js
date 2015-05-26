import $ from "jquery";
import jqueryEasing from "jqueryEasing";
import Engine from "Engine";
import "css!/css/Entity.css";

var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'
var animationEnd = 'webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend';
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


class Entity {
	static get types() {
		return {
			TYPE1: "TYPE1", // A primary element, will be position fixed
			TYPE2: "TYPE2" // A secondar element, will be position relative
		}
	}

	constructor(options) {
		this.direction = {
			x: directions.NONE,
			y: directions.NONE
		};
		this.size = {
			width: 30,
			height: 30
		};
		this.el = null;
		this.$el = $();
		this.jumps = 0;
		this.entType = Entity.types.TYPE1;
		this.tagName = "div";
		this.bindEvents();
		this.ground = 194.5;
		this.gravity = Engine.instance.gravity;
		this.friction = Engine.instance.friction;
		this.velocityY = 0.0;
		this.velocityX = 0.0;
		Object.assign(this, options);
		Engine.instance.addEntity(this);
	}

	get direction(){
		return this._direction;
	}

	set direction(value){
		
		var actions = {
			UP: ()=>{
				this.$el.removeClass('down').addClass('up');
			},
			DOWN: ()=>{
				this.$el.removeClass('up').addClass('down');
			},
			LEFT: ()=>{
				this.$el.removeClass('right').addClass('left');	
			},
			RIGHT: ()=>{
				this.$el.removeClass('left').addClass('right');
			},
			NONE: (axis)=>{
				if(axis == "x"){
					this.$el && this.$el.removeClass('left right');
				}else{
					this.$el && this.$el.removeClass('up down');
				}
			}
		}

		value.x && actions[value.x] && actions[value.x]("x");
		value.y && actions[value.y] && actions[value.y]("y"); 
		this._direction = value;

	}

	update() {

		(this.velocityY !== 0) && (this.velocityY += this.gravity);
		(this.velocityX !== 0) && (this.velocityX += this.friction);

		this.positionY = this.positionY + this.velocityY;
		this.positionX = (this.direction.x == directions.LEFT)?this.positionX + this.velocityX:this.positionX - this.velocityX;

		if(this.direction.x == directions.LEFT && this.velocityX > 0
			|| this.direction.x == directions.RIGHT && this.velocityX > 0){
			this.direction.x = directions.NONE;
			this.velocityX = 0;

		}

		if (this.positionY > this.ground) {
			this.positionY = this.ground;
			this.velocityY = 0;
		}

	}

	jump() {
		this.jumps++;
		this.velocityY = -4;
	}

	goLeft() {
		this.direction.x = directions.LEFT;
		this.velocityX = -3.5;
	}

	goRight() {
		this.direction.x = directions.RIGHT;
		this.velocityX = -3.5;
	}

	set isStationaryY(value) {
		this._isStationaryY = value;
		if (this._isStationaryY) {
			this.velocityY = 0;
		}
	}

	set velocityY(value) {
		this._velocityY = value;
	}

	get velocityY() {
		return this._velocityY;
	}

	get top() {
		return this.$el.position().top;
	}

	get bottom() {
		return this.positionY + this.height();
	}

	set positionX(value) {
		this.$el.css({
			left: value
		});
	}

	get positionX() {
		return this.$el.position().left;
	}

	get positionY() {
		return this.$el.position().top;
	}

	set positionY(value) {
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

	bindEvents() { 
		$(document).on('keydown.' + this.constructor.name, event => {

			console.log(event.keyCode);

			var key = keyMappings[event.keyCode]
			var actions = {
				"LEFT": () => {
					this.goLeft();
				},
				"RIGHT": () => {
					this.goRight();
				},
				"UP": () => {
					this.jump();
				},
				"SPACEBAR": () => {
					this.jump();
				}
			}

			actions[key] && actions[key]();
		});
	}

	render() {
		return this;
	}

	set type(value) {
		this._entType = value;
	}

	set tagName(value) {
		this._tagName = value;
		this.el = document.createElement(this._tagName);
		this.el.className = this.constructor.name + " " + this.entType;
		this.$el = $(this.el).width(this.size.width).height(this.size.height);
	}
}

export default Entity;