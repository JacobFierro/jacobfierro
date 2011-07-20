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
		return $('.secondary_nav').find('a:eq(1)').attr('id');
	}
	
	function set_background_image(path) {
		$.backstretch(path, {speed: 150});
	}
	
	function set_active_work(name) {
		set_background_image('img/' + name + '.jpg');
		$('.secondary_nav').find('a').removeClass('active');
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
		if (full.lastIndexOf('.') === -1) {
			return full.substring( (full.lastIndexOf('/') +1) );
		} else {
			return full.substring( (full.lastIndexOf('/') +1), full.lastIndexOf('.') )
		}
	}
	
	context.highlight_nav = function(current) {
		$('.primary_nav').find('.'+current).addClass('active');
	}
	
	context.form_success = function(response, status, xhr, $form) {
		$('#response').hide().html(response).fadeIn();
	    $('#contactform').slideUp();
	}
	
})(jf);


$(document).ready(function(){
	var current = (jf.getCurrentPageName() === "") ? "index" : jf.getCurrentPageName();
	
	jf.highlight_nav(current);
	
	if (current === 'index') {
		$('#home').addClass('active');
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
