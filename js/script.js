var jacobfierro = {};


(function(context, undefined){
	
	function get_hash() {
		var href = $(location).attr('href');
		var retval = "";
		if (href.search('#') === -1) {
			retval = get_first_work_id();
		} else {
			var hash = href.substring(href.lastIndexOf('#')+1);
			if (hash.length === 0) {
				retval = get_first_work_id();
			} else {
				retval = hash;
			}
		}
		return retval;
	}
	
	function get_first_work_id() {
		return $('.workNav').find('a:first').attr('id');
	}
	
	function set_background_image(path) {
		$('body').css({ 'background-image' : 'url(' + path + ')' });
	}
	
	function set_active_work(name) {
		set_background_image('img/' + name + '.jpg');
		$('.workNav').find('a').removeClass('active');
		$('#'+name).addClass('active');
		
		$('.content').remove();
		
		$.get('work/'+name+'.html', function(data){	
			$('.context').after(data);
		});
		
	}
	
	/*
	** PUBLIC
	*/
	
	context.work_handler = function() {
		set_active_work(get_hash());
		
		$('.workNav').find('a').click(function(e){
			set_active_work( $(this).attr('id') );
		});
	}
	
	context.getCurrentPageName = function() {
		var full = $(location).attr('href');
		return full.substring(full.lastIndexOf('/')+1, full.lastIndexOf('.'));
	}
	
	context.highlight_main_nav = function() {
		var current = this.getCurrentPageName();
		$('#header').find('.'+current).addClass('active');
	}
	
})(jacobfierro);


$(function(){
	jacobfierro.highlight_main_nav();
	if(jacobfierro.getCurrentPageName() === 'work') {
		jacobfierro.work_handler();
	}
	
});
