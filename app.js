const mustacheExpress = require("mustache-express");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.engine("mustache", mustacheExpress());
app.use(methodOverride("_method"));
app.set("view engine", "mustache");
app.set("views", "./views");

const user = require("./routes/user");
const snippet = require("./routes/snippet");

mongoose.connect("mongodb://localhost/snippets");
let db = mongoose.connection;
db.once("open", function() {
  console.log("connected");
});

app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/", user);

app.use("/snippet", snippet);

app.listen(3000, () => {});
