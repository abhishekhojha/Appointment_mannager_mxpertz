const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const { authMiddleware, allowRoles } = require("../middleware/authMiddleware");

// ✅ Only doctors can access the patient list
router.get("/", authMiddleware, getUsers);

module.exports = router;
