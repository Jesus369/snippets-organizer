const User = require("../schema/userSchema");
const router = require("express-promise-router")();
const UsersController = require("../controllers/user");

router.route("/").get(UsersController.getAllSnippets);
router
  .route("/register")
  .get(UsersController.registerForm)
  .post(UsersController.registerUser);

router
  .route("/login")
  .get(UsersController.loginForm)
  .post(UsersController.loginUser);

router
  .route("/:id")
  .get(UsersController.getUser)
  .put(UsersController.updateUser)
  .delete(UsersController.deleteUser);

router.route("/:id/edit").get(UsersController.editUserPage);

router.route("/:id/cancelaccount").get(UsersController.userDelete);

router
  .route("/:id/createSnippet")
  .get(UsersController.createSnippetForm)
  .post(UsersController.createUserSnippet);

router.route("/:id/snippets").get(UsersController.userSnippets);

module.exports = router;
