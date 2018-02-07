const User = require("../schema/userSchema");

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
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(req.params.id, newUser);
    res.redirect("/");
  },

  deleteUser: async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.redirect("/");
  }
};
