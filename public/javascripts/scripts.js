$(document).ready(function() {
  $('.my-vote').each(function(index, element) {
    var vote = $(element)
      .text()
      .trim();
    if (vote === "Nay") {
      $(element).addClass('vote-nay');
    } else if (vote === "Yea") {
      $(element).addClass('vote-yay');
    }
  });
  $('span.political-party').each(function(index, element) {
    var party = $(element)
      .text()
      .trim();
    if (party === "D") {
      $(element).text("Democrat");
    } else if (party === "R") {
      $(element).text("Republican");
    }
  });
});