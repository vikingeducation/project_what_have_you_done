
$(document).ready(function(){

  $("#big-header").click(function(){
    window.location.href = "https://evening-wildwood-62025.herokuapp.com/";
  })

  $("select").change(function(){
    if ($("select").val() === "Committees") {
      $(".committees").slideDown(500);
      $(".bills").slideUp(0);
      $(".legislators").slideUp(0);
      $(".sessions").slideUp(0);
    }
    if ($("select").val() === "Bills") {
      $(".committees").slideUp(0);
      $(".bills").slideDown(500);
      $(".legislators").slideUp(0);
      $(".sessions").slideUp(0);
    }
    if ($("select").val() === "Legislators") {
      $(".committees").slideUp(0);
      $(".bills").slideUp(0);
      $(".legislators").slideDown(500);
      $(".sessions").slideUp(0);
    }
    if ($("select").val() === "Past Sessions") {
      $(".committees").slideUp(0);
      $(".bills").slideUp(0);
      $(".legislators").slideUp(0);
      $(".sessions").slideDown(500);
    }
  })


})
