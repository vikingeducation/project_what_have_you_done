
// IIFE
// =================================================
  // for each official, execute the request and collect information
  let i;
  for(i = 0; i <= (officials.length - 1); i++) {
    // IIFE
    (function(i) {
      var options = {
        method: 'GET',
        url: "https://api.propublica.org/congress/v1/members/" + officials[i].bioID + "/votes.json",
        headers: { 'x-api-key': keys.proPub },
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        var APIerr = null;
        if (response.statusCode !== 200 ) {
          APIerr = `Invalid API Response: ${response}`;
          callback(error, APIerr, null);
        } else {

            var obj = JSON.parse(body);
            // assign chamber and init votes array 
            // results[0] requires bracketed index
            // because it's just a big wrapper
            officials[i]['chamber'] = obj.results[0].votes[0].chamber;
            officials[i]['votes']= [];

                // specifically pushing 5 votes
                let j;
                for(j = 0; j <= 4; j++) {
                  (function(j) {
                    let newVote = new votes.Vote(obj, j);
                    officials[i]['votes'].push(newVote);
                  })(j);
                }

                
                
                
                callback(officials);
              // closes request
              }});
            // closes IIFE and invokes
          })(i);
          // closes for loop  
        }
// closes execute ProPub request
}



// ASYNC.EACH 
// ======================================================

var executeProPubRequest = (officials, callback) => {
   var resultsArray = [];
   // official is object with rep information
   async.each(officials, function(official, callback) {
     var options = {
       method: 'GET',
       url: "https://api.propublica.org/congress/v1/members/" + official.bioID + "/votes.json",
       headers: { 'x-api-key': keys.proPub }
     };
 
     request(options, function(error, response, body) {
       if (error) throw new Error(error);
 
       var APIerr = null;
       if (response.statusCode !== 200 ) {
         APIerr = `Invalid API Response: ${response}`;
         callback(error, APIerr, null);
       } else {
 
           var obj = JSON.parse(body);
           // assign chamber and init votes array 
           // results[0] requires bracketed index
           // because it's just a big wrapper
           official['chamber'] = obj.results[0].votes[0].chamber;
           official['votes']= [];
 
               // specifically pushing 5 votes
               let j;
               for(j = 0; j <= 4; j++) {
                 (function(j) {
                   let newVote = new votes.Vote(obj, j);
                   official['votes'].push(newVote);
                 })(j);
               }
             // closes else
             }
             resultsArray.push(official);
             // runs at end of every loop iteration
             callback();
   // closes request
   }),
   
     // intermediate callback 
     function(err) {
       // if err
       if(err) { console.log(err); }
       callback(resultsArray);
     };
   // closes async.each
   });
 
 };
 


