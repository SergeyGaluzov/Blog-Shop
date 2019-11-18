const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname));
app.set("view engine", "pug");
app.get("/", function(request, response){
  response.sendFile(__dirname + "/html/index.html");
});
app.get("/new_post", function(request, response){
  response.render('post_template.pug');
});
app.post("/new_post", urlencodedParser, function(request, response) {
  response.redirect(307, "/posts");
});
app.post("/posts", urlencodedParser, function(request, response) {
  text = request.body.post_text
  console.log(text);
});