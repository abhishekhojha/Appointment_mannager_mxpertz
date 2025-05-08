import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "@/pages/register";
import Login from "@/pages/login";
import Home from "@/pages/Home";
import Users from "./pages/Users";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "@/components/ui/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointments" element={<MyAppointments />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
