
var states = {
  	AL:1,MT:1,AK:1,NE:1,AZ:1,NV:1,AR:1,NH:1,CA:1,NJ:1,CO:1,NM:1,CT:1,NY:1,DE:1,
    NC:1,FL:1,ND:1,GA:1,OH:1,HI:1,OK:1,ID:1,OR:1,IL:1,PA:1,IN:1,RI:1,IA:1,SC:1,
    KS:1,SD:1,KY:1,TN:1,LA:1,TX:1,ME:1,UT:1,MD:1,VT:1,MA:1,VA:1,MI:1,WA:1,MN:1,
    WV:1,MS:1,WI:1,MO:1,WY:1
}

var f = {
  headerRedirect: function(){
    $("h1").click(function(){
      window.location.href = "https://evening-wildwood-62025.herokuapp.com/";
    })
  },

  typeLetter: function(){
    $(document).on("keypress", function(event){
      if ((/^[a-zA-Z]*$/.test(event.key)) && event.which!==13) {
        if ($(".letter").first().hasClass("active-div")) {
          $(".letter-text.active").html(event.key.toUpperCase());
          $(".letter").toggleClass("active-div");
          $(".letter-text").toggleClass("active");
        }
        else {
          $(".letter-text.active").html(event.key.toUpperCase());
          $(".letter.active-div").toggleClass("active-div");
          $(".letter-text.active").toggleClass("active");
          $(".submit").slideDown(300);
        }
      }
    })
  },

  deleteLetter: function(){
    $(document).keydown(function(){
      if (event.which===8){
        if ($(".letter.active-div").length===0){
          $(".submit").slideUp(300);
          $(".letter").last().toggleClass("active-div");
          $(".letter-text").last().toggleClass("active").html("-");
        }
        else {
          if ($(".letter").last().hasClass("active-div")) {
            $(".letter").toggleClass("active-div");
            $(".letter-text").toggleClass("active");
            $(".letter-text").first().html("-");
          }
        }
      }
    })
  },

  submitState: function(){
    $(".submit").click(function(event){
      var stateL1 = $(".letter-text").first().html();
      var stateL2 = $(".letter-text").last().html();
      var state = stateL1 + stateL2;
      if (!(state in states)) {
        alert("Please enter a valid state.");
      }
      else {
        var url = "https://evening-wildwood-62025.herokuapp.com/states/" + state;
        window.location.href = url;
      }
   })
 },

 enterPress: function(){
   $(document).keydown(function(event){
     if (event.which===13){
       if ($(".letter.active-div").length===0){
         var stateL1 = $(".letter-text").first().html();
         var stateL2 = $(".letter-text").last().html();
         var state = stateL1 + stateL2;
         if (!(state in states)) {
           alert("Please enter a valid state.");
         }
         else {
           var url = "https://evening-wildwood-62025.herokuapp.com/states/" + state;
           window.location.href = url;
         }
       }
     }
   })
 }

}

$(document).ready(function(){
  f.headerRedirect();
  f.typeLetter();
  f.deleteLetter();
  f.submitState();
  f.enterPress();

})
