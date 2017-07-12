$(document).ready(function() {
	$("#submitButton").on("click", function(e) {
		var zip = String($("#zip").val());

		if (zip.length !== 5) {
			e.preventDefault();
			alert("Please enter a 5-digit zip code.");
		}
	});

	$(".vote").each(function() {
		var bill = $(this).find("h2").text();

		console.log(bill);

		var billParts = bill.split("-");

		var url = `https://www.govtrack.us/congress/bills/${billParts[1]}/${billParts[0]}`;

		var link = $(this).parent();

		link.attr("href", url);
		link.addClass("no-style");
	});
});