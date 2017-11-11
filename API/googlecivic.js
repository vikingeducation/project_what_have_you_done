const request = require('request');
const baseUri = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBODL8SdaUpAyGa-qIzcigjCZgZUhSkn2k&address="

class Google {
	constructor(address){
		this.address = address;
	}
upperBod(callback){
	this.sendRequest("legislatorUpperBody", callback)
}

lowerBod(callback){
	this.sendRequest("legislatorlowerBody", callback)
}



sendRequest(type,callback) {
	const url = `${baseUri}${this.address}&roles=${type}&fields=officials(name,party, photoUrl)`

	request(url, function(error,response,body){
		if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).officials)
      } 
      	else {
		console.log(error)
}
      
	})
}

}





module.exports = Google