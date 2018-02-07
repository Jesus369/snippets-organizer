const User = require("../schema/userSchema");
const Snippet = require("../schema/snippetSchema");

module.exports = {
  newUserForm: async (req, res, next) => {
    res.render("register");
  },

  createUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.redirect("/");
  },

  getUsers: async (req, res, next) => {
    const users = await User.find({});
    res.render("homepage", { users: users });
  },

  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render("showUser", { user: user });
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

  deleteUser: async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.redirect("/");
  },

  createSnippetForm: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render("createSnippet", { user: user });
  },

  getUserSnippet: async (req, res, next) => {
    /*Find the user by the Id matching params and include the snippets array*/
    const user = await User.findById(req.params.id).populate("snippets");
    res.json({ user: user });
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
    res.json(newSnippet);
  }
};
