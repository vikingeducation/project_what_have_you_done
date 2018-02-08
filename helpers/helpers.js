var helpers = {
   reps: function(items, options) {
      var out = "<ul>";

      for(var i = 0; i <= (reps.length -1); i++) {
         out = out + "<li>" + options.fn(items[i]) + "</li>";
      }

      return out + "</ul>";
   }
}; 

module.exports = helpers;