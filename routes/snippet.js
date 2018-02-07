const router = require("express-promise-router")();
const SnippetsControllers = require("../controllers/snippet");

router
  .route("/:id")
  .get(SnippetsControllers.showSnippet)
  .put(SnippetsControllers.updateSnippet)
  .delete(SnippetsControllers.deleteSnippet);

router.route("/:id/edit").get(SnippetsControllers.snippetEditPage);

module.exports = router;
