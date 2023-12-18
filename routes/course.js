const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const router = express.Router();

router.get("/", authenticateUser, getCourses);
router.get("/:id", authenticateUser, getCourse);
router.post("/", authenticateUser, authorizePermissions(), createCourse);
router.patch("/:id", authenticateUser, authorizePermissions(), updateCourse);
router.delete("/:id", authenticateUser, authorizePermissions(), deleteCourse);

module.exports = router;
