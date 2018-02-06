const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
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

var User = mongoose.model("User", userSchema);
module.exports = User;
