var URI = {
  updateURI: function(searchParams){
    var base = 'https://congress.api.sunlightfoundation.com/';
    var uri = `${base}legislators/locate?zip=${searchParams}`;
    return uri
  }
}

module.exports = URI
