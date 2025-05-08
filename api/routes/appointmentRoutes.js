const express = require("express");
const {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getUnavailableAppointments,
} = require("../controllers/appointmentController");
const { authMiddleware, allowRoles } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/appointments/book", authMiddleware, bookAppointment);
router.delete("/appointments/:appointmentId", authMiddleware, cancelAppointment);
router.get("/appointments", authMiddleware, getAppointments);
router.get("/appointments/unavailable", getUnavailableAppointments);
module.exports = router;
