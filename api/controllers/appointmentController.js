const Appointment = require("../model/Appointment");
const User = require("../model/User");
// Book Appointment
const bookAppointment = async (req, res) => {
  const { doctorId, date } = req.body;
  const patientId = req.user.userId;
  if (!doctorId || !patientId) {
    // console.log("Doctor ID or Patient ID is missing", doctorId, patientId,req.user);
    
    return res.status(400).json({ message: "Invalid doctor or patient ID" });
  }

  try {
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor" });
    }

    // if (!patient || patient.role !== "patient") {
    //   return res.status(400).json({ message: "Invalid patient" });
    // }

    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
      const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.patient.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot cancel this appointment" });
    }

    await appointment.deleteOne();
    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.log("Cancel error:", error);
    
    res.status(500).json({ message: "Error canceling appointment", error });
  }
};

// Get Appointments (for authenticated user - patient or doctor)
const getAppointments = async (req, res) => {
  const userId = req.user.userId; // Assuming user data is in req.user

  try {
    const appointments = await Appointment.find({
      $or: [{ doctor: userId }, { patient: userId }],
    }).populate("doctor patient", "email"); 
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

const getUnavailableAppointments = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const appointments = await Appointment.find({ doctor: doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching unavailable dates" });
  }
};

module.exports = {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getUnavailableAppointments,
};
