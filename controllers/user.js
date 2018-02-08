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
