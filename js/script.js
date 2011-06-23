var jacobfierro = {};


(function(context, undefined){
	
	function getCurrentPageName() {
		var full = $(location).attr('href');
		return full.substring(full.lastIndexOf('/')+1, full.lastIndexOf('.'));
	}
	
	context.highlightNav = function() {
		var current = getCurrentPageName();
		$('#header').find('.'+current).addClass('active');
	}
	
	
})(jacobfierro);


$(function(){
	jacobfierro.highlightNav();
});
