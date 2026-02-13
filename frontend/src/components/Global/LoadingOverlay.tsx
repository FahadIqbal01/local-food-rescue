interface LoadingOverlayProps {
  message?: string;
  type?: "loading" | "success" | "error";
}

export default function LoadingOverlay({
  message,
  type = "loading",
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
      {type === "loading" && (
        <svg
          className="animate-spin h-12 w-12 text-white mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}

      <p
        className={`text-white text-2xl font-semibold ${
          type === "success" ? "text-green-400" : "text-white"
        }`}
      >
        {message || "Loading..."}
      </p>
    </div>
  );
}
