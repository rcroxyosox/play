import $ from "jquery";
import Entity from "Entity";

var App = { 
	start(){
		var ent = new Entity({gravity: 0.01});
		$('body').append(ent.render().$el);
	}
} 
 
export default App;