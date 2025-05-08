import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { BASE_URL } from "@/config.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState(""); // You should replace this with the logged-in user's ID
  const [date, setDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/users?role=doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err.message);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch unavailable dates when doctor changes
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      if (!doctorId) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/api/appointments/unavailable?doctorId=${doctorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const bookedDates = res.data.map((appt) => new Date(appt.date));
        setUnavailableDates(bookedDates);
      } catch (err) {
        console.error("Failed to fetch unavailable dates:", err.message);
      }
    };

    fetchUnavailableDates();
  }, [doctorId]);

  const handleBookAppointment = async () => {
    if (!doctorId || !date) {
      alert("Please select both doctor and appointment time.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/appointments/book`,
        { doctorId, patientId, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Appointment booked successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

      <div className="mb-4">
        <Label htmlFor="doctor">Select Doctor</Label>
        <select
          id="doctor"
          className="w-full mt-2 p-2 border rounded"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.email}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label htmlFor="date">Select Appointment Date</Label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          excludeDates={unavailableDates}
          placeholderText="Select a date and time"
          className="w-full mt-2 p-2 border rounded"
        />
      </div>

      <Button className="mt-4 w-full" onClick={handleBookAppointment}>
        Book Appointment
      </Button>
    </div>
  );
};

export default BookAppointment;
