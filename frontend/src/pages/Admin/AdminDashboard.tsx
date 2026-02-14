import { useEffect, useState } from "react";
import Navbar from "../../components/Global/NavBar";
import axios from "axios";
import EmptyStateMessage from "../../components/EmptyStateMessage";
import EditModal from "../../modals/EditModal";
import DeleteModal from "../../modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/Global/LoadingOverlay";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // States for middle panel's tables.
  const [activeTab, setActiveTab] = useState<
    "donors" | "recipients" | "donations"
  >("donations");

  // States for tabs in Donor's Modal.
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [donorTab, setDonorTab] = useState<
    "profile" | "donations" | "activity"
  >("profile");
  const [donorsDonations, setDonorsDonations] = useState<Donation[]>([]);

  // States for tabs in Recipient's Modal.
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [recipientTab, setRecipientTab] = useState<
    "profile" | "claims" | "activity"
  >("profile");

  // State for Selected Donation
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [donationTab, setDonationTab] = useState<
    "details" | "activity" | "claims"
  >("details");
  const [editDonation, setEditDonation] = useState(false);
  const [deleteDonation, setDeleteDonation] = useState(false);
  const [detailDonation, setDetailDonation] = useState(false);

  type Donation = {
    _id: string;
    donorID?: string;
    foodType: string;
    quantity: number;
    pickupAddress: string;
    status: "pending" | "available" | "completed" | "expired";
    expiryDate?: string;
    notes?: string;
  };
  type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    address: string;
    status: "active" | "inactive" | "banned";
  };
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [donors, setDonors] = useState<User[]>([]);
  const [totalDonors, setTotalDonors] = useState<number>(0);
  const [recipients, setRecipients] = useState<User[]>([]);
  const [totalRecipients, setTotalRecipients] = useState<number>(0);

  // Pagination states
  const [limit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    async function getAllDonations() {
      setLoadingData(true);
      const token = localStorage.getItem("authToken");
      try {
        const stats = await axios.get(
          "http://local-food-rescue.railway.internal/api/admin/get/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (stats.data.status) {
          setTotalDonors(stats.data.totalDonors || 0);
          setTotalRecipients(stats.data.totalRecipients || 0);
        }

        if (activeTab === "donations") {
          const response = await axios.get(
            "http://local-food-rescue.railway.internal/api/admin/get/donation",
            {
              params: { limit, page },
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (response.data.status) {
            setDonations(response.data.allDonations || []);
            setTotalPages(Math.ceil(response.data.total / limit));
            setTotalDonations(response.data.total);
          }
        } else if (activeTab === "donors") {
          const allDonors = await axios.get(
            "http://local-food-rescue.railway.internal/api/admin/get/donors",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (allDonors.data.status) {
            // console.log(allDonors.data);
            setDonors(allDonors.data.allDonors || []);
            setTotalPages(Math.ceil(allDonors.data.total / limit));
          }
        } else if (activeTab === "recipients") {
          const recipients = await axios.get(
            "http://local-food-rescue.railway.internal/api/admin/get/recipients",
            {
              params: {
                limit,
                page,
              },
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (recipients.data.status) {
            setRecipients(recipients.data.allRecipients || []);
            setTotalPages(Math.ceil(recipients.data.total / limit));
          }
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoadingData(false);
      }
    }
    getAllDonations();
  }, [page, limit, activeTab]);

  function handleUpdateDonation(updatedDonation: any) {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation._id === updatedDonation._id ? updatedDonation : donation,
      ),
    );
  }

  async function handleDeleteDonation(id: string) {
    try {
      await axios.delete(
        `http://local-food-rescue.railway.internal/api/donation/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setDonations((prev) => prev.filter((donation) => donation._id !== id));
      setDetailDonation(false);
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  }
  return (
    <>
      {loadingData && <LoadingOverlay message="Fetching data..." />}
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar role="admin" userName="ABC" colorClass="bg-purple-600" />

        {/* Main Content: 3 Panels */}
        <div className="flex flex-grow bg-gray-100 p-6 gap-6">
          {/* Left Panel: Summary */}
          <div className="w-1/6 space-y-4">
            <div className="bg-green-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-green-800">
                Total Donors
              </h2>
              <p className="text-2xl font-bold">{totalDonors}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-blue-800">
                Total Recipients
              </h2>
              <p className="text-2xl font-bold">{totalRecipients}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-yellow-800">
                Total Donations
              </h2>
              <p className="text-2xl font-bold">{totalDonations}</p>
            </div>
          </div>

          {/* Middle Panel: Management */}
          {/* ---------------- Middle Panel: Management ---------------- */}
          <div className="w-5/6 bg-white rounded shadow p-4 flex flex-col">
            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => {
                  setActiveTab("donations");
                  setPage(1);
                  setTotalPages(1);
                }}
                className={`px-4 py-2 rounded ${
                  activeTab === "donations"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Donations
              </button>
              <button
                onClick={() => {
                  setActiveTab("donors");
                  setPage(1);
                  setTotalPages(1);
                }}
                className={`px-4 py-2 rounded ${
                  activeTab === "donors"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Donors
              </button>
              <button
                onClick={() => {
                  setActiveTab("recipients");
                  setPage(1);
                  setTotalPages(1);
                }}
                className={`px-4 py-2 rounded ${
                  activeTab === "recipients"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Recipients
              </button>
            </div>

            {/* Donors Table */}
            {activeTab === "donors" && (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow overflow-y-auto min-h-[300px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2">Donor ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.length === 0 ? (
                        <EmptyStateMessage message="No donors available." />
                      ) : (
                        donors.map((donor) => (
                          <tr key={donor._id} className="border-b">
                            <td className="p-2">{donor._id}</td>
                            <td className="p-2">{donor.name}</td>
                            <td className="p-2">{donor.email}</td>
                            <td className="p-2">
                              {
                                <span
                                  className={`px-2 py-1 rounded text-sm ${
                                    donor.status === "active"
                                      ? "bg-green-100 text-green-700"
                                      : donor.status === "inactive"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : donor.status === "banned"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {donor.status}
                                </span>
                              }
                            </td>
                            <td className="p-2">
                              <button
                                onClick={() => {
                                  setSelectedDonor(donor);
                                  setDonorTab("profile");
                                  navigate(`/admin/donors/${donor._id}`);
                                }}
                                className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recipients Table */}
            {activeTab === "recipients" && (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow overflow-y-auto min-h-[300px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2">Recipient ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipients.length === 0 ? (
                        <EmptyStateMessage message="No recipients available." />
                      ) : (
                        recipients.map((recipient) => (
                          <tr key={recipient._id} className="border-b">
                            <td className="p-2">{recipient._id}</td>
                            <td className="p-2">{recipient.name}</td>
                            <td className="p-2">{recipient.email}</td>
                            <td className="p-2">
                              {
                                <span
                                  className={`px-2 py-1 rounded text-sm ${
                                    recipient.status === "active"
                                      ? "bg-green-100 text-green-700"
                                      : recipient.status === "inactive"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : recipient.status === "banned"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {recipient.status}
                                </span>
                              }
                            </td>
                            <td className="p-2">
                              <button
                                onClick={() => {
                                  setSelectedRecipient(recipient);
                                  setRecipientTab("profile");
                                  navigate(
                                    `/admin/recipients/${recipient._id}`,
                                  );
                                }}
                                className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Donations Table */}
            {activeTab === "donations" && (
              <div className="flex flex-col flex-grow">
                {/* Table container with fixed min-height */}
                <div className="flex-grow overflow-y-auto min-h-[300px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2">Item</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length === 0 ? (
                        <EmptyStateMessage message="No donations available." />
                      ) : (
                        donations.map((donation) => (
                          <tr key={donation._id} className="border-b">
                            <td className="p-2">{donation.foodType}</td>
                            <td className="p-2">{donation.quantity}</td>
                            <td className="p-2">
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  donation.status === "available"
                                    ? "bg-green-100 text-green-700"
                                    : donation.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : donation.status === "completed"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                              >
                                {donation.status}
                              </span>
                            </td>
                            <td className="p-2 space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedDonation(donation);
                                  setDetailDonation(true);
                                  setDonationTab("details"); // default tab
                                }}
                                className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDonation(donation);
                                  setEditDonation(true);
                                }}
                                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDonation(donation);
                                  setDeleteDonation(true);
                                }}
                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination fixed at bottom */}
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => {
                  setPage(page + 1);
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Panel: Analytics */}
          {/* <div className="w-1/6 bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Impact Analytics</h2>
            <div className="flex-grow space-y-2">
              <p className="text-gray-700">Meals Rescued: {215}</p>
              <p className="text-gray-700">Active Listings: {12}</p>
            </div>
            <button
              onClick={() => setShowAnalytics(true)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Show Analytics
            </button>
          </div> */}
        </div>

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Analytics Modal */}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-2/3 h-3/4 flex flex-col">
              <button
                onClick={() => setShowAnalytics(false)}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Detailed Analytics</h2>
              <div className="flex-grow overflow-y-auto border rounded p-4">
                <p className="text-gray-700">[Charts and graphs placeholder]</p>
              </div>
            </div>
          </div>
        )}

        {/* Donors Modal */}
        {selectedDonor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-3/4 h-[80vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedDonor(null);
                  setDonorsDonations([]);
                }}
                className="absolute top-8 right-8 text-gray-600 hover:text-black font-bold text-xl"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-6 text-purple-700 border-b pb-2">
                Donor Details
              </h2>

              {/* Tabs */}
              <div className="flex space-x-4 border-b mb-4">
                {["profile", "donations", "activity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setDonorTab(tab as "profile" | "donations" | "activity")
                    }
                    className={`px-4 py-2 text-sm font-semibold ${
                      donorTab === tab
                        ? "text-purple-700 border-b-2 border-purple-700"
                        : "text-gray-600 hover:text-purple-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                {donorTab === "profile" && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedDonor.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedDonor.email}
                      </p>
                      <p>
                        <span className="font-semibold">Donor ID:</span>{" "}
                        {selectedDonor._id}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                      <p>
                        <span className="font-semibold">Total Donations:</span>
                        <span className="ml-2 px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold">
                          {donations.length}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {donorTab === "donations" && (
                  <div className="flex flex-col flex-grow">
                    {/* Table container with fixed min-height */}
                    <div className="flex-grow overflow-y-auto min-h-[300px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200 text-left">
                            <th className="p-2">Item</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donorsDonations.map((donation) => (
                            <tr key={donation._id} className="border-b">
                              <td className="p-2">{donation.foodType}</td>
                              <td className="p-2">{donation.quantity}</td>
                              <td className="p-2">
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination fixed at bottom */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        disabled={page === 1}
                        onClick={() => {
                          setPage(page - 1);
                        }}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-gray-600">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        disabled={page === totalPages}
                        onClick={() => {
                          setPage(page + 1);
                        }}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {donorTab === "activity" && (
                  <ul className="space-y-2">
                    <li className="text-gray-700">
                      Donation added: Bread Loaves (20)
                    </li>
                    <li className="text-gray-700">
                      Donation delivered: Rice Bags (10)
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recipients Modal */}
        {selectedRecipient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-3/4 h-[80vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setSelectedRecipient(null)}
                className="absolute top-8 right-8 text-gray-600 hover:text-black font-bold text-xl"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-6 text-purple-700 border-b pb-2">
                Recipient Details
              </h2>

              {/* Tabs */}
              <div className="flex space-x-4 border-b mb-4">
                {["profile", "claims", "activity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setRecipientTab(tab as "profile" | "claims" | "activity")
                    }
                    className={`px-4 py-2 text-sm font-semibold ${
                      recipientTab === tab
                        ? "text-purple-700 border-b-2 border-purple-700"
                        : "text-gray-600 hover:text-purple-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                {/* Profile Tab */}
                {recipientTab === "profile" && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedRecipient.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedRecipient.email}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                      <p>
                        <span className="font-semibold">Total Claimed:</span>
                        <span className="ml-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">
                          {selectedRecipient.claimed}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Claims Tab */}
                {recipientTab === "claims" && (
                  <div className="flex flex-col flex-grow">
                    {/* Table container with fixed min-height */}
                    <div className="flex-grow overflow-y-auto min-h-[300px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200 text-left">
                            <th className="p-2">Item</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {recipientClaims
                          .slice(
                            (recipientCurrentPage - 1) * recipientClaimsPerPage,
                            recipientCurrentPage * recipientClaimsPerPage,
                          )
                          .map((claim, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="p-2">{claim.item}</td>
                              <td className="p-2">{claim.quantity}</td>
                              <td className="p-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    claim.status === "Received"
                                      ? "bg-green-200 text-green-800"
                                      : "bg-yellow-200 text-yellow-800"
                                  }`}
                                >
                                  {claim.status}
                                </span>
                              </td>
                            </tr>
                          ))} */}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination fixed at bottom */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        // disabled={recipientCurrentPage === 1}
                        onClick={
                          () => {}
                          // setRecipientCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-gray-600">
                        {/* Page {recipientCurrentPage} of {recipientTotalPages} */}
                      </span>
                      <button
                        // disabled={recipientCurrentPage === recipientTotalPages}
                        onClick={
                          () => {}
                          // setRecipientCurrentPage((prev) =>
                          //   Math.min(prev + 1, recipientTotalPages),
                          // )
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {recipientTab === "activity" && (
                  <ul className="space-y-2">
                    <li className="text-gray-700">
                      Claim requested: Milk Cartons (25)
                    </li>
                    <li className="text-gray-700">
                      Claim received: Vegetables (15)
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Selected Donation Modal */}
        {selectedDonation && detailDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-3/4 h-[80vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedDonation(null);
                  setDetailDonation(false);
                }}
                className="absolute top-8 right-8 text-gray-600 hover:text-black font-bold text-xl"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-6 text-purple-700 border-b pb-2">
                Donation Details
              </h2>

              {/* Tabs */}
              <div className="flex space-x-4 border-b mb-4">
                {["details", "claims"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDonationTab(tab as "details" | "claims")}
                    className={`px-4 py-2 text-sm font-semibold ${
                      donationTab === tab
                        ? "text-purple-700 border-b-2 border-purple-700"
                        : "text-gray-600 hover:text-purple-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                {/* Details Tab */}
                {donationTab === "details" && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                      <p>
                        <span className="font-semibold">Item:</span>{" "}
                        {selectedDonation.foodType}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {selectedDonation.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Pickup Address:</span>{" "}
                        {selectedDonation.pickupAddress}
                      </p>
                      <p>
                        <span className="font-semibold">Status updated to</span>{" "}
                        {selectedDonation.status}
                      </p>
                      <p>
                        <span className="font-semibold">Expiry Date:</span>{" "}
                        {selectedDonation.expiryDate === ""
                          ? "--"
                          : selectedDonation.expiryDate}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Notes: {selectedDonation.notes}
                        </span>{" "}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Donation created on
                        </span>{" "}
                        {Date()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Claims Tab */}
                {donationTab === "claims" && (
                  <div className="flex flex-col flex-grow">
                    {/* Table container with fixed min-height */}
                    <div className="flex-grow overflow-y-auto min-h-[250px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200 text-left">
                            <th className="p-2">Recipient</th>
                            <th className="p-2">Quantity Claimed</th>
                            <th className="p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {recipientClaims
                          .filter(
                            (claim) => claim.donationId === selectedDonation.id,
                          )
                          .slice(
                            (claimsCurrentPage - 1) * claimsPerPage,
                            claimsCurrentPage * claimsPerPage,
                          )
                          .map((claim, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="p-2">{claim.recipient}</td>
                              <td className="p-2">{claim.quantity}</td>
                              <td className="p-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    claim.status === "Received"
                                      ? "bg-green-200 text-green-800"
                                      : "bg-yellow-200 text-yellow-800"
                                  }`}
                                >
                                  {claim.status}
                                </span>
                              </td>
                            </tr>
                          ))} */}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination fixed at bottom */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        // disabled={claimsCurrentPage === 1}
                        onClick={
                          () => {}
                          // setClaimsCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-gray-600">
                        {/* Page {claimsCurrentPage} of {claimsTotalPages} */}
                      </span>
                      <button
                        // disabled={claimsCurrentPage === claimsTotalPages}
                        onClick={
                          () => {}
                          // setClaimsCurrentPage((prev) =>
                          //   Math.min(prev + 1, claimsTotalPages),
                          // )
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          // <DetailModal
          //   donation={selectedDonation}
          //   onClose={() => setDetailDonation(false)}
          // />
        )}

        {selectedDonation && editDonation && (
          <EditModal
            donation={selectedDonation}
            onClose={() => setEditDonation(false)}
            onUpdate={handleUpdateDonation}
          />
        )}

        {selectedDonation && deleteDonation && (
          <DeleteModal
            donation={selectedDonation}
            onClose={() => setDeleteDonation(false)}
            onConfirm={handleDeleteDonation}
          />
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
