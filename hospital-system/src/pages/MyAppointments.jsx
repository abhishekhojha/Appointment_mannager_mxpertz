import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config.json";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== appointmentId)
      );
      alert("Appointment cancelled.");
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Error cancelling appointment.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">You have no appointments yet.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <Card key={appt._id}>
              <CardContent className="p-4">
                <p>
                  <strong>Doctor:</strong> {appt.doctor?.email}
                </p>
                <p>
                  <strong>Patient:</strong> {appt.patient?.email}
                </p>
                <p>
                  <strong>Date:</strong> {format(new Date(appt.date), "PPPpp")}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(appt._id)}
                  className="mt-2"
                >
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
