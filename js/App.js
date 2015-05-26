import $ from "jquery";
import Entity from "Entity";

var App = { 
	start(){
		var ent = new Entity();
		$('body').append(ent.render().$el);
	}
} 
 
export default App;