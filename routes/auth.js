const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllSubUsers,
} = require("../controllers/authController");
const middleware = require("../middlewares/authMiddleware");

router.post("/admin/register", register);
router.post("/admin/login", login);
router.get("/admin/sub-users", middleware, getAllSubUsers);

module.exports = router;
