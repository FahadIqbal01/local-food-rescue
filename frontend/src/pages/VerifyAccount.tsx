import { useState, useEffect } from "react";
import axios from "axios";

function VerifyAccount() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const token: string | null = params.get("token");

    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}:3001/api/user/verify`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then((res) => {
          setStatus("success");
          alert("Account verified successfully!");
          window.location.href = "/login";
        })
        .catch((err) => {
          setStatus("error");
          console.error(err);
          alert("Verification failed.");
        });
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-100 to-green-200">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-700">
              Verifying your account...
            </h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-700">
              Account Verified!
            </h2>
            <p className="text-gray-600 mt-2">
              Your account has been activated successfully.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Go to Login
            </a>
          </>
        )}
        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-700">
              Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">
              Invalid or expired token. Please try again.
            </p>
            <a
              href="/register"
              className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Register Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyAccount;
