import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  role: "donor" | "recipient" | "admin";
  userName: string;
  colorClass: string;
}

export default function Navbar({ role, userName, colorClass }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full ${colorClass} text-white px-6 py-3 flex justify-between items-center`}
    >
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link to="/">Food Rescue</Link>
      </div>

      {/* Right: Avatar Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="/user.png" // placeholder avatar
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
            {role === "admin" && (
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
            )}

            {/* Common links */}
            {/* <Link
              to="/analytics"
              className="block px-4 py-2 hover:bg-purple-100"
              onClick={() => setMenuOpen(false)}
            >
              Impact Analytics
            </Link> */}
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-purple-100"
              onClick={() => setMenuOpen(false)}
            >
              Profile / Settings
            </Link>
            <button
              className="w-full text-left px-4 py-2 hover:bg-purple-100"
              onClick={() => {
                setMenuOpen(false);
                // handle logout logic here
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
