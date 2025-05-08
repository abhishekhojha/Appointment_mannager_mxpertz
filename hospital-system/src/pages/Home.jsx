import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          {isLoggedIn ? "Welcome Back!" : "Welcome to HealthCare Portal"}
        </h1>

        <p className="text-gray-600 text-lg">
          {isLoggedIn
            ? "You are logged in. Access your dashboard or log out below."
            : "A platform where patients and doctors connect easily and securely."}
        </p>

        <div className="flex justify-center gap-4">
          {isLoggedIn ? (
            <>
              <Button onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
