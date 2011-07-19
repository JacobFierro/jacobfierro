var jf = {};


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
		$.backstretch(path, {speed: 150});
	}
	
	function set_active_work(name) {
		set_background_image('img/' + name + '.jpg');
		$('.workNav').find('a').removeClass('active');
		$('#'+name).addClass('active');
		
		$('.content').remove();
		
		$.get('work/'+name+'.html', function(data){	
			$('.context').after( innerShiv(data, false) );
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
		//log(full.lastIndexOf('.'));
		
		if (full.lastIndexOf('.') === -1) {
			log('no file name');
			return full.substring( (full.lastIndexOf('/') +1) );
		} else {
			log('file name');
			return full.substring( (full.lastIndexOf('/') +1), full.lastIndexOf('.') )
		}
	}
	
	context.highlight_main_nav = function(current) {
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
	
})(jf);


$(document).ready(function(){
	//$.backstretch("img/home.jpg", {speed: 200});
	
	var current = (jf.getCurrentPageName() === "") ? "index" : jf.getCurrentPageName();
	
	jf.highlight_main_nav(current);
	
	
	if (current === 'index') {
		$.backstretch("img/home.jpg", {speed: 200});
	} else if (jf.getCurrentPageName() === 'work') {
		jf.work_init();
	} else if (jf.getCurrentPageName() === 'contact') {
	$("#contactform").validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				success: jf.form_success
			});
		},
		invalidHandler: function(form, validator) {
			log('invalid');
		}
	});	
}
	
});
