const express = require("express");
const router = express.Router();
const {
  register,
  login,
  addNewSubUser,
  subUserLogin,
} = require("../controllers/authController");
const middleware = require("../middlewares/authMiddleware");

router.post("/admin/register", register);
router.post("/admin/login", login);
router.post("/sub-user/login", subUserLogin);
router.post("/admin/sub-users", middleware, addNewSubUser);

module.exports = router;
