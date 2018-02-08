<<<<<<< HEAD
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
=======
const User = require("../schema/userSchema");
const Snippet = require("../schema/snippetSchema");

module.exports = {
  registerForm: async (req, res, next) => {
    res.render("register");
  },

  registerUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.redirect("/");
  },

  loginForm: async (req, res, next) => {
    res.render("login");
  },

  loginUser: async (req, res, next) => {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { password: req.body.password }]
    });
    if ((user.password = req.body.password)) {
      req.session.username = req.body.username;
      req.session.userId = user.id;
      req.session.authenticated = true;
      res.redirect("/");
    } else {
      res.send("An error occured");
    }
  },

  getAllSnippets: async (req, res, next) => {
    const snippets = await Snippet.find({});
    res.render("homepage", {
      snippets: snippets,
      username: req.session.username,
      userId: req.session.userId
    });
  },

  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("snippets");
    if (req.session.username == user.username) {
      res.render("showUser", { user: user });
    } else {
      res.send("You do not have permission to view this person!");
    }
  },

  editUserPage: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render("editUser", { user: user });
  },

  updateUser: async (req, res, next) => {
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(req.params.id, newUser);
    res.redirect("/");
  },

  userDelete: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render("cancelPage", { user: user });
  },

  deleteUser: async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.redirect("/");
  },

  userSnippets: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("snippets");
    res.render("userSnippets", { user: user });
  },

  createSnippetForm: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render("createSnippet", { user: user });
  },

  createUserSnippet: async (req, res, next) => {
    /*Create a new Snippet*/
    const newSnippet = new Snippet(req.body);
    /*Get User*/
    const user = await User.findById(req.params.id);
    /*Assign the user as a publisher for Snippet*/
    newSnippet.publisher = user;
    /*Save the snippet*/
    await newSnippet.save();
    /*Add snippet to the userSchema snippets array*/
    user.snippets.push(newSnippet);
    /*Save the user*/
    await user.save();
    res.redirect("/" + req.params.id);
  }
};
>>>>>>> origin/master
