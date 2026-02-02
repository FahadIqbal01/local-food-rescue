import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build request body according to backend schema
    const requestBody = {
      name,
      email,
      password,
      role,
      phoneNumber,
      address,
    };

    // Later: send requestBody to backend API
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/api/user/post",
        requestBody,
      );
      if (response.data.status) {
        alert("User created successfully!");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Your Account
        </h2>
        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
            />
          </div>
          {/* Email */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
            />
          </div>
          {/* Password */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
            />
          </div>
          {/* Phone Number */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
            />
          </div>
          {/* Address (full width) */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Addresses</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter your address`}
              className="w-full px-4 py-2 border rounded mb-2 focus:ring-2 focus:ring-green-600"
            />
          </div>
          {/* Role */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?
            <a href="/login" className="text-green-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
