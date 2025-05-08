const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
