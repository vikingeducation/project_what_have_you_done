$(document).ready(function() {
	$("#submitButton").on("click", function(e) {
		var zip = String($("#zip").val());

		if (zip.length !== 5) {
			e.preventDefault();
			alert("Please enter a 5-digit zip code.");
		}
	});
});