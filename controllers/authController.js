const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const { successResponse, errorResponse } = require("./../config/response");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "admin",
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();

    successResponse(
      req,
      res,
      "User registered successfully",
      userWithoutPassword,
      201
    );
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(req, res, "Invalid credentials", 400);
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    successResponse(req, res, "User Logged In successfully", { token }, 201);
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Controller to get all sub-users under the logged-in admin
const getAllSubUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse(req, res, "Access denied. Admins only.", 403);
    }

    const subUsers = await User.findAll({
      where: { createdBy: req.user.userId, role: "sub_user" },
      attributes: { exclude: ["password"] },
    });

    successResponse(req, res, "Sub-Users Created by  Admin", subUsers, 200);
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Controller to create a new sub-user under the logged-in admin
const createSubUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse(req, res, "Access denied. Admins only.", 403);
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(
        req,
        res,
        "Username and password are required.",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subUser = await User.create({
      username,
      password: hashedPassword,
      role: "sub_user",
      createdBy: req.user.userId,
    });

    const { password: _, ...subUserWithoutPassword } = subUser.toJSON();

    successResponse(
      req,
      res,
      "Sub-user created successfully",
      { subUserWithoutPassword },
      201
    );
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

module.exports = { register, login, getAllSubUsers, createSubUser };
