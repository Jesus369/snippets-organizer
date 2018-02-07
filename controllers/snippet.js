const User = require("../schema/userSchema");
const Snippet = require("../schema/snippetSchema");

module.exports = {
  showSnippet: async (req, res, next) => {
    /*Find the user by the Id matching params and include the snippets array*/
    const snippet = await Snippet.findById(req.params.id);
    res.render("showSnippet", { snippet: snippet });
  },

  snippetEditPage: async (req, res, next) => {
    const snippet = await Snippet.findById(req.params.id);
    res.render("editSnippet", { snippet: snippet });
  },

  updateSnippet: async (req, res, next) => {
    const newSnippet = req.body;
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, newSnippet);
    res.redirect("/snippet/" + req.params.id);
  },

  deleteSnippet: async (req, res, next) => {
    const snippet = await Snippet.findByIdAndRemove(req.params.id);
    res.redirect("/");
  }
};
