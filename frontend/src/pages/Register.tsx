import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    console.log("Form submitted:", { name, email, password, role });
    // Later: send data to backend API
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Your Account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
