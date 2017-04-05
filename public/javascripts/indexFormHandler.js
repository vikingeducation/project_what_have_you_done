$(document).ready(function() {
    console.log("ready to rock and roll");

});

var clickGo = function() {
    var zipInput = $('#zipInput').val();
    $('.warning-message').remove();
    if (!(zipInput.length != 5 || isNaN(zipInput))) {
        location.href = "/legislators/zip/" + zipInput;
    } else {
      $('#zipInput').after("<span class='text-danger h4 warning-message'>Please enter a five digit zip.</span>")
    };
}
