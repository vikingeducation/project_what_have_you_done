//representative class
 //take a giant block of data, make into a class we care about

const log = console.log

//the api gives results in this format
  //['results':{}, 'count': #, 'page':{}]
//var results = json_obj.results;

class Representative {
  constructor( json_obj ){
    this.bioguide_id = json_obj.bioguide_id;
    try {
      this.basic_info = {
        first_name : json_obj.first_name,
        middle_name : json_obj.middle_name,
        last_name : json_obj.last_name,
        party : json_obj.party,
        //party : this.party( json_obj.party ),
        chamber : json_obj.chamber
      }
      this.contact_info = {
        website: json_obj.website
      }
    } catch (e) {
      console.log( e );
    }
  }
  say_hello(){
    log( `Hello, ${this.basic_info.first_name} here, ready to party.`);
  }
  party( char ){
    if (char == 'r'){
      return "Republican"
    }else if (char == 'd'){
      return "Democrat"
    }
  }
}

module.exports = Representative;
