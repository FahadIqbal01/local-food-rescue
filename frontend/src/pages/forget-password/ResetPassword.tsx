import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  //   const [searchParams] = useSearchParams(); // token from URL
  //   const token = searchParams.get("token");
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.patch(
        "http://127.0.0.1:3001/api/forgot/reset",
        { token, newPassword },
      );

      if (response.data.status) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Reset failed. Please request a new link.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-purple-700 mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your new password below to reset your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-purple-600 hover:underline text-sm font-medium"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
