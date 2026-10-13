
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET /api/instructor/courses
router.get(
  "/courses",
  authenticateToken,
  authorizeRoles("instructor", "admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Instructor courses accessed successfully.",
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
      courses: [],
    });
  }
);

module.exports = router;
