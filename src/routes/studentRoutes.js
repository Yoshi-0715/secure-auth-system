
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET /api/student/dashboard
router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("student", "instructor", "admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the Student Dashboard.",
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

module.exports = router;
