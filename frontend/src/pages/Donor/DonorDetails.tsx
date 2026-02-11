import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Donation {
  _id: string;
  foodType: string;
  quantity: number;
  status: string;
  pickupAddress: string;
  expiryDate?: string;
  notes?: string;
}

interface Donor {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  status: string;
  profilePictureUrl?: string;
}

function DonorDetails() {
  const { id } = useParams(); // donorId from route
  const navigate = useNavigate();

  const [donor, setDonor] = useState<Donor | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    async function fetchDonorDetails() {
      try {
        // Fetch donor info
        const donorRes = await axios.get(
          `http://127.0.0.1:3001/api/admin/donors/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (donorRes.data.status) {
          setDonor(donorRes.data.donor);
        }

        // Fetch donor's donations
        const donationsRes = await axios.get(
          `http://127.0.0.1:3001/api/admin/donors/${id}/donations`,
          {
            params: { page, limit },
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (donationsRes.data.status) {
          setDonations(donationsRes.data.donations || []);
          setTotalPages(Math.ceil(donationsRes.data.total / limit));
        }
      } catch (error) {
        console.error("Error fetching donor details:", error);
      }
    }

    fetchDonorDetails();
  }, [id, page, limit]);

  if (!donor) {
    return <div className="p-6">Loading donor details...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Donor Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-1/2 border border-gray-200 flex gap-6 items-start">
        {/* Left: Profile Picture + Name */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex justify-start mb-4">
            <img
              src={donor.profilePictureUrl || "/user.png"}
              alt={`${donor.name}'s profile`}
              className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        </div>
        {/* Right: User Information */}
        <div className="flex-1 grid grid-cols-1 gap-4 w-2/3 text-gray-700 text-pretty">
          <h2 className="text-2xl font-semibold text-gray-800 ">
            {donor.name}
          </h2>
          <p>
            <span className="font-medium">Email:</span> {donor.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {donor.phoneNumber || "N/A"}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {donor.address || "N/A"}
          </p>
          <p>
            <span className="font-medium">Status:</span> {donor.status}
          </p>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Donations</h2>
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-100 text-left text-gray-700">
              <th className="p-3">Donation ID</th>
              <th className="p-3">Food Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Status</th>
              <th className="p-3">Pickup Address</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-b">
                <td className="p-3">{donation._id}</td>
                <td className="p-3">{donation.foodType}</td>
                <td className="p-3">{donation.quantity}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      donation.status === "available"
                        ? "bg-green-100 text-green-700"
                        : donation.status === "completed"
                          ? "bg-yellow-100 text-yellow-700"
                          : donation.status === "expired"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="p-3">{donation.pickupAddress}</td>
                <td className="p-3">{donation.expiryDate || "N/A"}</td>
                <td className="p-3">{donation.notes || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="text-gray-600 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default DonorDetails;
