const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
  state: String,
  snippets: [
    {
      type: Schema.Types.ObjectId,
      ref: "snippet"
    }
  ]
});

var User = mongoose.model("user", userSchema);
module.exports = User;
