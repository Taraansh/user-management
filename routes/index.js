const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const middleware = require("../middlewares/authMiddleware");

router.use("/auth", authRoutes);
router.get("/api/protected", middleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
