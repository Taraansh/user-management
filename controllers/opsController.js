const { Admin, SubUser } = require("../models");
require("dotenv").config();
const { successResponse, errorResponse } = require("./../config/response");

// Controller to get all sub-users under the logged-in admin
const getAllSubUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse(req, res, "Access denied. Admins only.", 403);
    }

    const subUsers = await SubUser.findAll({
      where: { createdBy: req.user.userId, role: "sub_user" },
      attributes: { exclude: ["password"] },
    });

    successResponse(req, res, "Sub-Users Created by  Admin", subUsers, 200);
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

// Controller to get the profile of the logged-in sub-user, including admin details
const getSubUserProfile = async (req, res) => {
  try {
    if (req.user.role !== "sub_user") {
      return errorResponse(req, res, "Access denied. Sub-users only.", 403);
    }

    const subUser = await SubUser.findOne({
      where: { id: req.user.userId },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Admin,
          as: "admin",
          attributes: ["id", "username", "role"],
        },
      ],
    });

    if (!subUser) {
      return errorResponse(req, res, "Sub-user profile not found", 404);
    }

    successResponse(
      req,
      res,
      "Profile retrieved successfully",
      { subUser },
      200
    );
  } catch (error) {
    errorResponse(req, res, error.message, 500);
  }
};

module.exports = { getAllSubUsers, getSubUserProfile };
