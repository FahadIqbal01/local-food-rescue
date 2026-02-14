import { useEffect } from "react";

interface NotificationsProps {
  message: string;
  type?: "success" | "error" | "info";
}

export default function Notification({
  message,
  type = "info",
}: NotificationsProps) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`${colors[type]} text-white px-4 py-2 rounded fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg text-center`}
    >
      {message}
    </div>
  );
}
