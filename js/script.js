var jacobfierro = {};


(function(context, undefined){
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
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
			$('a.gallimg').fancybox();
		});
		
	}
	
	/*
	** PUBLIC
	*/
	
	context.work_init = function() {
		var query = getUrlVars()['v'];
		var work ="";
		if (query === undefined) {
			work = get_first_work_id();
		} else {
			work = (query.length > 0) ? query : get_first_work_id();
		}
		set_active_work(work);
	}
	
	context.getCurrentPageName = function() {
		var full = $(location).attr('href');
		return full.substring(full.lastIndexOf('/')+1, full.lastIndexOf('.'));
	}
	
	context.highlight_main_nav = function() {
		var current = this.getCurrentPageName();
		$('#header').find('.'+current).addClass('active');
	}
	
	context.form_success = function(response, status, xhr, $form) {
		// for normal html responses, the first argument to the success callback 
	    // is the XMLHttpRequest object's responseText property 

	    // if the ajaxSubmit method was passed an Options Object with the dataType 
	    // property set to 'xml' then the first argument to the success callback 
	    // is the XMLHttpRequest object's responseXML property 

	    // if the ajaxSubmit method was passed an Options Object with the dataType 
	    // property set to 'json' then the first argument to the success callback 
	    // is the json data object returned by the server
	
	 
		$('#response').hide().html(response).fadeIn();
	    $('#contactform').slideUp();
		
	}
	
})(jacobfierro);


$(function(){
	jacobfierro.highlight_main_nav();
	if(jacobfierro.getCurrentPageName() === 'work') {
		jacobfierro.work_init();
	} else if (jacobfierro.getCurrentPageName()==='contact') {
		$("#contactform").validate({
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					success: jacobfierro.form_success
				});
			},
			invalidHandler: function(form, validator) {
				log('invalid');
			}
		});
		
		
	}
	
	
	
});
