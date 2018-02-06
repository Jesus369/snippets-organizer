const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
  state: String
});

var User = mongoose.model("User", userSchema);
module.exports = User;
