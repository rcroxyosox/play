import $ from "jquery";
import jqueryEasing from "jqueryEasing";
import Engine from "Engine";
import "css!/css/Entity.css";

var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'
var animationEnd = 'webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend';

class Entity {
	static get types() {
		return {
			TYPE1: "TYPE1", // A primary element, will be position fixed
			TYPE2: "TYPE2" // A secondar element, will be position relative
		}
	}

	constructor(options) {
		this.size = {
			width: 30,
			height: 30
		};
		this.jumps = 0;
		this.entType = Entity.types.TYPE1;
		this.tagName = "div";
		this.bindEvents();
		this.ground = 194.5;
		this.gravity = Engine.instance.gravity;
		this.velocityY = 0.0;
		this.velocityX = 0.0;
		Object.assign(this, options);
		Engine.instance.addEntity(this);
	}

	onGoingDown(){
		this.$el.removeClass('up');
		this.$el.addClass('down');
	}

	onGoingUp(){
		this.$el.removeClass('down');
		this.$el.addClass('up');
	}

	onStill(){
		this.$el.removeClass('up down');
	}

	update() {

		// let ground = 194.5;
		(this.velocityY !== 0) && (this.velocityY += this.gravity);
		this.positionY = this.positionY + this.velocityY;
		this.positionX = this.positionX + this.velocityX;

		if(this.positionY > this.ground){
			this.positionY = this.ground;
			this.velocityY = 0;
		}

	}

	jump() {
		this.velocityY = -1;
	}

	set isStationaryY(value){
		this._isStationaryY = value;
		if(this._isStationaryY){
			this.velocityY = 0;
		}
	}

	set velocityY(value){

		console.log(this.size.width, value);
		// this.$el.width();

		this._velocityY = value;
	}

	get velocityY(){
		return this._velocityY;
	}

	get top(){
		return this.$el.position().top;
	}

	get bottom(){
		return this.positionY + this.height();
	}

	set positionX(value){
		this.$el.css({left: this._positionX});
	}

	get positionX(){
		return this.$el.position().left;
	}

	get positionY(){
		return this.$el.position().top;
	}

	set positionY(value){

		if(value > this._positionY){
			this.onGoingDown();
		}else if(value < this._positionY){
			this.onGoingUp();
		}else{
			this.onStill();
		}

		this._positionY = value;
		this.$el.css({top: this._positionY});
	}

	bindEvents() {
		$(document).on('keypress.' + this.constructor.name, event => {
			if (event.keyCode == 32) {
				this.jumps++;
				this.jump();
			}
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