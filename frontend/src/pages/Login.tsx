import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginRequestBody = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/api/user/login",
        loginRequestBody,
      );

      console.log(response.data.user);
      if (response.data.status) {
        const token: string = response.data.token;
        const role: string = response.data.user.role;

        // Save token for later requests
        localStorage.setItem("authToken", token);

        // Redirect based on role
        if (role === "donor") {
          navigate("/donor");
        } else if (role === "recipient") {
          navigate("/recipient");
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        alert("User logged in successfully.");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login to Food Rescue
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2`}
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
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-700 hover:underline">
              Register
            </a>
          </p>
          <p className="mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
