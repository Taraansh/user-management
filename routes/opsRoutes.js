const express = require("express");
const router = express.Router();
const {
  getAllSubUsers,
  getSubUserProfile,
} = require("../controllers/opsController");

router.get("/admin/sub-users", getAllSubUsers);
router.get("/sub-user/profile", getSubUserProfile);

module.exports = router;
