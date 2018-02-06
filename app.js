const mustacheExpress = require("mustache-express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./schema/userSchema");

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("mustache", mustacheExpress());
app.use(methodOverride("_method"));
app.set("view engine", "mustache");
app.set("views", "./views");

mongoose.connect("mongodb://localhost/snippets");
let db = mongoose.connection;
db.once("open", function() {
  console.log("connected");
});

app.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send("err");
    } else {
      res.render("homepage", { users: users });
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send("An error has occured getting the user");
    } else {
      res.render("showUser", { user: user });
    }
  });
});

app.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send("An error occure loading the 'edit' page");
    } else {
      res.render("editUser", { user: user });
    }
  });
});

app.post("/register", (req, res) => {
  var user = new User();
  (user.email = req.body.email), (user.password =
    req.body.password), (user.firstname = req.body.firstname), (user.lastname =
    req.body.lastname), (user.age = req.body.age), (user.city =
    req.body.city), (user.state = req.body.state), user.save((err, newUser) => {
    if (err) {
      res.send("An error has occured");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("connected!");
});
