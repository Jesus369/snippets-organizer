const User = require("../schema/userSchema");
const router = require("express-promise-router")();
const UsersController = require("../controllers/user");

router.route("/").get(UsersController.getUsers);
router
  .route("/register")
  .get(UsersController.newUserForm)
  .post(UsersController.createUser);

router
  .route("/:id")
  .get(UsersController.getUser)
  .put(UsersController.updateUser)
  .delete(UsersController.deleteUser);

router.route("/:id/edit").get(UsersController.editUserPage);
router.route("/:id/createSnippet").get(UsersController.createSnippetForm);

router
  .route("/:id/snippets")
  .get(UsersController.getUserSnippet)
  .post(UsersController.createUserSnippet);

module.exports = router;
