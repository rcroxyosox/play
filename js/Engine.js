class Engine{

	constructor(options){
		this.entities = [];
		this.gravity = 0.02;
		this.framerate = 1.0;
		this.loop();
	}

	addEntity(entity){
		this.entities.push(entity);
	}

	loop(){
		let loopInt = setInterval(()=>{
			for (let k in this.entities){
				if(this.entities[k].update){
					this.entities[k].update();
				}else{
					console.error("No update set for "+k);
					clearInterval(loopInt);
				}
			}
		}, Engine.framerate);
	}

	static get instance(){
		return engine;
	}
}

var engine = new Engine();
export default Engine;