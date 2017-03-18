var express = require("express");
var app = express();
var request = require("request");
// setto le view engine con ejs
app.set("view engine", "ejs");

// creo la route per la ricerca
app.get("/", function(req, res){
  res.render("search");
});

// creo route dei risultato
app.get("/results", function(req, res){
  var query = req.query.search;
  var url = "http://omdbapi.com?s=" + query;
  
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      if(data["Response"] != "False"){
        res.render("results", { data: data });  
      } else {
        res.render("sorry");
      }
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Movie App has started!!!");
});