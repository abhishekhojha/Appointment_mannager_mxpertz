import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(JSON.parse(localStorage.getItem("user")));

    if (token) {
      setIsLoggedIn(true);
    } else if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      // Redirect to login page only if not on login or register page
      navigate("/login");
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // User is now logged out
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="space-x-6">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          {isLoggedIn ? (
            <>
              {user && user.role == "doctor" && (
                <a href="/users" className="hover:text-gray-300">
                  Users
                </a>
              )}
              {user && user.role != "doctor" && (
                <a href="/book-appointment" className="hover:text-gray-300">
                  Book Appointment
                </a>
              )}
              <a href="/appointments" className="hover:text-gray-300">
                My Appointments
              </a>

              <a
                href="/"
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-gray-300">
                Login
              </a>
              <a href="/signup" className="hover:text-gray-300">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
