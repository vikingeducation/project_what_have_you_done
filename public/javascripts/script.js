$(document).ready(function() {

  $("input[type=text]").on("keypress", function(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      if ($(this).hasClass("empty")) {
        $(this).removeClass("empty");
      };
    };
    return (event.charCode >= 48 && event.charCode <= 57);
  });

  $(".zipInput").on("keyup", checkForm);

  $(".party").filter(function() {
    if ($(this).text().trim() === "D") {
      $(this).text("Democrat");
    } else {
      $(this).text("Republican");
    };
  });

  $(".chamber").filter(function() {
    if ($(this).text().trim() === "house") {
      $(this).text("House");
    } else {
      $(this).text("Senate");
    };
  });

  $(".my-vote").filter(function() {
    if ($(this).text().trim() === "Yea") {
      $(this)
        .closest(".bill")
        .addClass("yea");
    } else {
      $(this)
        .closest(".bill")
        .addClass("nay");
    };
  });
});

function checkForm() {
  var count = $(".zipInput").filter(function() {
    return (!$(this).hasClass("empty"));
  }).length;

  var total = 5;

  if (count === total) {
    $(".submit").addClass("active");
    $(".submit").removeAttr("disabled");
    $(".zip").val(formatZip());
  } else {
    $(".submit").attr("disabled", "disabled");
  };
};

function formatZip() {
  var zipCode = "";
  $(".zipInput").each(function() {
    zipCode += $(this).val();
  });
  return zipCode;
};
