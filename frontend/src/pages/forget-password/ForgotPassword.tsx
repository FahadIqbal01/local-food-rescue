import axios from "axios";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Later: call backend API here
    axios.post(`${process.env.REACT_APP_API_URL}/api/forgot/verifyUser`, {
      email,
    });
    // setMessage("If this email exists, a reset link has been sent.");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-purple-700 mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your email address below and we’ll send you a link to reset your
          password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
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

export default ForgotPassword;
