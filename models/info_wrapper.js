const base_uri = "https://congress.api.sunlightfoundation.com";
const request = require('request');

var Wrapper = {

	locate_legislators: function(zip){
		var url_param = `legislators/locate?zip=${zip}`;
		var url = this.generate_url(url_param);
		return Wrapper.make_request(url);
	},

	get_bills_voted_on: function(bioguide_id){
		
		var url = Wrapper.generate_url(`votes?voter_ids.${bioguide_id}__exists=true&per_page=50`);
		return Wrapper.make_request(url);
	},

	get_single_bill: function(bill_id){
		var url = Wrapper.generate_url(`bills?bill_id=${bill_id}`);
		return Wrapper.make_request(url);
	},

	//fix: if/else variable assign in one function doesn't work for
	//whateve reason
	get_bill_information: function(bill, ids=false){
		var arr = [];
		for(var b in bill){
			var bill_id = bill[b].bill_id;
			var url = Wrapper.generate_url(`bills?bill_id=${bill_id}`);
			var resolved = Promise.resolve(Wrapper.make_request(url));
			arr.push(Promise.resolve(resolved))
		}
		return Promise.all(arr);
	},

	get_bill_by_id: function(bill){
		var arr = [];
		for(var b in bill){
			var bill_id = bill[b];
			var url = Wrapper.generate_url(`bills?bill_id=${bill_id}`);
			var resolved = Promise.resolve(Wrapper.make_request(url));
			arr.push(Promise.resolve(resolved))
		}
		return Promise.all(arr);
	},


	locate_legislator: function(name){
		var name = name.split("-");
		var first_name = name[0];
		var last_name = name[1];
		var url = Wrapper.generate_url(`legislators?first_name=${first_name}&last_name=${last_name}`);
		console.log(url);

		return Wrapper.make_request(url);
	},


	generate_url: function(url){
		return `${base_uri}/${url}`;
	},

	make_request: function(url){
		return new Promise(function(resolve, reject){
			request(url,
		 		function(err, response, body){
			 	if(err){
			 		reject(err)
			 	}
			 	resolve( JSON.parse(body) );
			 }); 
		})
	}
}


module.exports = Wrapper;