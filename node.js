const express = require("Express");
const app = express();

app.use(express.static("Projekt2"));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

/*
app.get("/name/:name", function(req, res){
   const name = req.params.name;
   res.send("<h1>Hello " + name +"</h1>");
});

app.get("/google/:search", function(req, res){
   const search = req.params.search;
   res.redirect('https://google.com/search?q='+search);
});
*/
