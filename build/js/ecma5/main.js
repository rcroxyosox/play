// ec6 polyfill
Object.assign = function(target, obj){
	$.extend(target, obj);
}


require.config({
	paths :{
		'jqueryEasing':'/js/lib/jquery.easing',
		'jquery':'/js/lib/jquery-1.11.3',
		'css': '/js/lib/require-css/css'
	},
	shim:{
		'jquery': {
			exports: '$'
		},
		'jqueryEasing': {
			exports: 'jqueryEasing',
			deps: ['jquery']
		}
	}
});

require(['App'], function(App){
	App.start();
});