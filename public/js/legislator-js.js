$(document).ready(function(){
	App.init();
})

var App = {
	init: function(){
		App.remove_duplicates();
		App.remove_empty_elems();
		App.color_links();
	},

	remove_duplicates: function(){
		//API returns many duplicate bills, this removes them.
		var seen = {};
		$(".my-votes div").each(function(){
			var title_text = $("h3", $(this)).text();
			if(seen[title_text]){
				$(this).remove();
			}
			else{
				seen[title_text] = true;
			}
		})
	},

	color_links: function(){
		var bill = $(".bill-title");
		bill.each(function(){
			if($(this).attr('id') == 'pass'){
				$(this).css('color', 'green');
			}
			else{
				$(this).css('color', 'red')
			}
		})
	},

	remove_empty_elems: function(){
		$(".my-votes div").each(function(){
			var title_text = $("h3", $(this)).text();
			var body_text = $("p", $(this));

			if(title_text.length == 0 || body_text.length == 0){
				$(this).remove();
			}
		});
	}
}