const User = require("../schema/userSchema");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({}).then(users => {
      res.render("homepage", { users: users });
    });
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201);
  },

  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id).then(user => {
      res.render("showUser", { user: user });
    });
  }
};
