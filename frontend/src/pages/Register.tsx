import React, { useState } from "react";
import axios from "axios";
import LoadingOverlay from "../components/Global/LoadingOverlay";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setShowPassword(false);
    setSuccess(false);

    // Build FormData for multipart/form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("profilePicture", profilePicture!);

    // Later: send requestBody to backend API
    try {
      const response = await axios.post(
        "http://local-food-rescue.railway.internal/api/user/post",
        formData,
      );
      if (response.data.status) {
        setLoading(true);
        setSuccess(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      // const errorsCount: number = error.response.data.message.length;
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  return (
    <>
      {loading && <LoadingOverlay message="Creating user..." />}
      {success && (
        <LoadingOverlay
          message="Signup successful! Please check your email to verify your account."
          type="success"
        />
      )}
      {!success && (
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
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
              {/* Profile Picture */}
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-600"
                  required
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-4 h-24 w-24 object-cover rounded-full border"
                  />
                )}
              </div>

              {Array.isArray(errorMessage) ? (
                <ul className="list-disc list-inside text-red-600 text-sm space-y-1 col-span-2">
                  {errorMessage.map((msg: string, index: number) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-600 text-sm w-full col-span-2">
                  {errorMessage}
                </p>
              )}

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
      )}
    </>
  );
}

export default Register;
