const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const auth = require("../middleware/auth");

// Use memory storage for multer to process files before uploading to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
// Protected routes
router.post(
  "/",
  // auth,
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "descriptionPhotos", maxCount: 10 },
  ]),
  createProject
);
router.put(
  "/:id",
  //auth,
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "descriptionPhotos", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/:id", deleteProject);

module.exports = router;
