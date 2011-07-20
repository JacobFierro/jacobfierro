var jf = {};


(function(context, undefined){
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	function get_first_work() {
		return $('.secondary_nav').find('a:eq(1)').attr('class');
	}
	
	function get_current_context() {
		return $('.content').attr('id');
	}
	
	function set_background_image(path) {
		$.backstretch(path, {speed: 150});
	}
	
	function set_active_work(work) {
		set_background_image('img/' + work + '.jpg');
		highlight_secondary_nav(work)
		
		$('.content').remove();
		
		$.get('work/'+work+'.html', function(data){	
			$('.context').after( innerShiv(data, false) );
			$('a.gallimg').fancybox();
		});
	}
	
	function highlight_primary_nav(context) {
		$('.primary_nav').find('.nav_'+context).addClass('active');
	}
	
	function highlight_secondary_nav(active) {
		$('.secondary_nav').find('a').removeClass('active');
		$('.'+active).addClass('active');
	}
	
	function form_success(response, status, xhr, $form) {
		$('#response').hide().html(response).fadeIn();
	    $('#contactform').slideUp();
	}
	
	/*
	** PUBLIC
	*/
	
	context.init = function() {
		//determine the context we're in: home, work or contact
		var context = get_current_context()
		
		highlight_primary_nav(context); //hl main nav
		
		//secondary nav and context specific functionality
		if (context === "home") {
			$('.home').addClass('active');
			$.backstretch("img/home.jpg", {speed: 200});
		} else if (context === "work") {
			var query = getUrlVars()['v'];
			var work ="";
			if (query === undefined) {
				work = get_first_work();
			} else {
				work = (query.length > 0) ? query : get_first_work();
			}
			set_active_work(work);
		} else if (context === "contact") {
			$("#contactform").validate({
				submitHandler: function(form) {
					$(form).ajaxSubmit({
						success: form_success
					});
				},
				invalidHandler: function(form, validator) {
					log('invalid');
				}
			});
		}
		
	}
	
})(jf);


$(document).ready(function(){
	jf.init();
});
