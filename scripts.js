var xmlhttp = new XMLHttpRequest();
const baseUri = "https://congress.api.sunlightfoundation.com"



class YourReps {

   UserAction(type, callback) {
     const url = `${baseUri}/${type}`
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {


          // console.log( xmlhttp.responseText);
          //    document.getElementById("zipBox").value = xmlhttp.responseText;
          if(JSON.parse(xmlhttp.responseText).results !== "undefinied"){
callback(JSON.parse(xmlhttp.responseText).results)}

         }
       };



      console.log(url);
      xmlhttp.open("GET", url, true);
       xmlhttp.send();


  }
  repsInZip(callback, zipCode) {
    this.UserAction("legislators/locate?zip=" + zipCode.toString(), callback)
  }

  repsID(callback, repToFind) {
    this.UserAction("legislators?query=" + repToFind.toString(), callback)
  }

  repsVotes(callback,repID) {
    console.log("votes?voter_ids." + repID.toString() + "__exists=true");
    this.UserAction("votes?voter_ids." + repID.toString() + "__exists=true", callback)
  }

  // _sendRequest(type, callback) {
  //   const url = `${baseUri}/${type}`
  //
  //   request(url, function(error, response, body) {
  //     if (!error & response.statusCode === 200) {
  //       callback(JSON.parse(body).results)
  //     }
  //   })
  // }
}

const reps = new YourReps;
var findID = function(repLastName){
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
console.log(JSON.parse(xmlhttp.responseText).results[0].bioguide_id);
findBills(JSON.parse(xmlhttp.responseText).results[0].bioguide_id);
      }
    };

var url2 = "https://congress.api.sunlightfoundation.com/legislators?query=" + repLastName.toString();


   xmlhttp.open("GET", url2, true);
    xmlhttp.send();

}

var findBills = function(repIDNum){
console.log("bills");
var tt = document.getElementById('BillList').innerHTML = "";

reps.repsVotes(function(data) {

  console.log(data);
for(var i=0; i < data.length ; i++) {



var y = document.createElement("LI");
y.innerHTML = data[i].roll_id + " " + data[i].question

if(data[i].bill_id.split("-") !== "undefined" ){
var searchTerm = "https://www.govtrack.us/congress/bills/" + data[i].congress + "/" + data[i].bill_id.split("-")[0];
}
y.setAttribute("id", searchTerm);
y.setAttribute("onclick", "LinkToBill(this.id)");
//var t = document.createTextNode(data[i].roll_id + " " + data[i].question);

//y.appendChild(t);
document.getElementById("BillList").appendChild(y);
}
},repIDNum);



}
var LinkToBill = function(billPage){

  window.open(billPage);
}


var ZipCodeSearch = function(){
var ttt = document.getElementById('BillList').innerHTML = "";
console.log( document.getElementById("zipBox").value);
var tt = document.getElementById('RepList').innerHTML = "";


reps.repsInZip(function(data) {
for(var i=0; i < data.length; i++) {
  console.log(data[i].first_name + " " + data[i].last_name);

var y = document.createElement("LI");
y.setAttribute("id", data[i].last_name);
y.setAttribute("onclick", "findID(this.id)");
var t = document.createTextNode(data[i].first_name + " " + data[i].last_name);
y.appendChild(t);
document.getElementById("RepList").appendChild(y);

} }, document.getElementById("zipBox").value);



}
