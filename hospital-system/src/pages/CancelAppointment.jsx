import React, { useState } from "react";
import { Button, Label } from "@shadcn/ui"; // Assuming ShadCN components
import axios from "axios";
import { BASE_URL } from "@/config.json";

const CancelAppointment = () => {
  const [appointmentId, setAppointmentId] = useState("");

  const handleCancelAppointment = async () => {
    try {
      await axios.delete(`${BASE_URL}/appointments/${appointmentId}`);
      alert("Appointment canceled successfully!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Error canceling appointment.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Cancel Appointment</h2>
      <div className="mb-4">
        <Label htmlFor="appointmentId">Appointment ID</Label>
        <input
          id="appointmentId"
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full" onClick={handleCancelAppointment}>
        Cancel Appointment
      </Button>
    </div>
  );
};

export default CancelAppointment;
