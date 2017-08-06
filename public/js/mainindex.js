$(document).ready(function(){
	App.init();
})

var App = {

	init: function(){
		App.set_event_listeners();
	},

	set_event_listeners: function(){
		$("#locate input[type='submit']").click( App.validate_form );
	},

	validate_form: function(e){
		e.preventDefault();
		if($("#zipenter").val().length !=5 || $("#zipenter").val().match(/[0-9]{5}/) == null){
			View.invalid_form(true);
		}
		else{
			View.invalid_form(false);
			var zip = $("#zipenter").val();
			var zip_url = `/${zip}`;
			$("#zip-link").attr("onclick", `window.location='${zip_url}'`);
		}
	}
}

var View = {

	invalid_form: function(invalid){
		if(invalid){
			$("#zipenter").addClass("invalid");
			$("#error").text("Please fix your errors");
		}
		else{
			$("zipenter").removeClass("invalid");
			$("#error").text("");
		}
	}
}

