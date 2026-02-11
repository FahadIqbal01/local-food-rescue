import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  role?: "donor" | "recipient" | "admin";
  userName?: string;
  colorClass: string;
}

export default function Navbar({ colorClass }: NavbarProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://127.0.0.1:3001/api/user/get/data", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserName(res.data.user.name);
          setUserRole(res.data.user.role);
          setProfilePicture(res.data.user.profilePictureUrl);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("donorID");
    localStorage.clear();
  }
  return (
    <nav
      className={`w-full ${colorClass} text-white px-6 py-3 flex justify-between items-center`}
    >
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          Food Rescue - Welcome to{" "}
          {userRole && userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
        </Link>
      </div>

      {/* Right: Avatar Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src={profilePicture || "/user.png"} // placeholder avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="hidden md:inline font-semibold">{userName}</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg">
            {/* Role-specific links */}
            {/* {role === "donor" && (
              <Link
                to="/donor-dashboard"
                className="block px-4 py-2 hover:bg-purple-100"
                onClick={() => setMenuOpen(false)}
              >
                My Donations
              </Link>
            )} */}
            {/* {role === "recipient" && (
              <Link
                to="/recipient-dashboard"
                className="block px-4 py-2 hover:bg-purple-100"
                onClick={() => setMenuOpen(false)}
              >
                My Claims
              </Link>
            )} */}
            {/* {userRole === "admin" && (
              <>
                <Link
                  to="/admin-dashboard/donors"
                  className="block px-4 py-2 hover:bg-purple-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage Donors
                </Link>
                <Link
                  to="/admin-dashboard/recipients"
                  className="block px-4 py-2 hover:bg-purple-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage Recipients
                </Link>
                <Link
                  to="/admin-dashboard/donations"
                  className="block px-4 py-2 hover:bg-purple-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage Donations
                </Link>
              </>
            )} */}

            {/* Common links */}
            {/* <Link
              to="/analytics"
              className="block px-4 py-2 hover:bg-purple-100"
              onClick={() => setMenuOpen(false)}
            >
              Impact Analytics
            </Link> */}
            {/* <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-purple-100"
              onClick={() => setMenuOpen(false)}
            >
              Profile / Settings
            </Link> */}
            <button
              className="w-full text-left px-4 py-2 hover:bg-purple-100"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
                // handle logout logic here
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
