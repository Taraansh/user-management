const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { successResponse, errorResponse } = require("./../config/response");
const { Admin, SubUser } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Admin.findOne({ where: { username } });
    if (existingUser) {
      return errorResponse(req, res, "Username already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({
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
    const user = await Admin.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(req, res, "Invalid credentials", 400);
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    successResponse(req, res, "User Logged In successfully", { token }, 201);
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Sub-user login controller
const subUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const subUser = await SubUser.findOne({ where: { username } });
    if (!subUser) {
      return errorResponse(req, res, "Invalid username or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, subUser.password);
    if (!isPasswordValid) {
      return errorResponse(req, res, "Invalid username or password", 401);
    }

    const token = jwt.sign(
      { userId: subUser.id, role: "sub_user", createdBy: subUser.createdBy },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    successResponse(
      req,
      res,
      "Login successful",
      {
        token,
      },
      200
    );
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Controller to create a new sub-user under the logged-in admin
const addNewSubUser = async (req, res) => {
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

    const existingUser = await SubUser.findOne({ where: { username } });
    if (existingUser) {
      return errorResponse(req, res, "Username already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subUser = await SubUser.create({
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
      subUserWithoutPassword,
      201
    );
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

module.exports = { register, login, subUserLogin, addNewSubUser };
