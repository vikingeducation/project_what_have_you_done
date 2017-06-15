var input = document
              .getElementsByClassName("numput");


function checkReq() {
  for(var i = 0; i < input.length; i++){
    if(input[i].value == "" || isNaN(input[i].value)) {
      input[i].setAttribute("class", "numput req");
    } else {
      input[i].setAttribute("class", "numput");
    }
  }
}
checkReq();
for(var i = 0; i < input.length; i++){
  input[i].addEventListener("keyup", function(){
    checkReq();
  });
}
