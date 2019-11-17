const express = require("express")
const app = express();
const path = require('path')

app.use(express.static(__dirname));

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "pug");

app.get("/", function(request, response){
  response.render("main", {title: "Главная Страница"});
}); 


app.get("/test", function(request, response){
  response.sendFile(__dirname + "/html/index.html");
}); 

app.listen(3000)