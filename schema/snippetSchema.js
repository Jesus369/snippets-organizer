const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var snippetSchema = new Schema({
  title: String,
  html: String,
  css: String,
  script: String,
  published: { type: Date, default: Date.now() },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

var Snippet = mongoose.model("snippet", snippetSchema);
module.exports = Snippet;
