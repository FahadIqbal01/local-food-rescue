import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/NavBar";
import axios from "axios";
import DonationRow from "../../components/DonationRow";
import EmptyStateMessage from "../../components/EmptyStateMessage";
import DetailModal from "../../modals/DetailModal";
import EditModal from "../../modals/EditModal";
import DeleteModal from "../../modals/DeleteModal";
import LoadingOverlay from "../../components/Global/LoadingOverlay";
import Notification from "../../components/Global/Notifications";

type FormData = {
  foodType: string;
  quantity: number;
  pickupAddress: string;
  status: string;
  expiryDate: string;
  notes: string;
};

type Donation = {
  _id: string;
  foodType: string;
  quantity: number;
  pickupAddress: string;
  status: "pending" | "available" | "completed" | "expired";
  expiryDate?: string;
  notes?: string;
  recipientID: string;
};

function DonorDashboard() {
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    foodType: "",
    quantity: 0,
    pickupAddress: "",
    status: "available",
    expiryDate: "",
    notes: "",
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalType, setModalType] = useState<
    "details" | "edit" | "delete" | null
  >(null);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8); // items per page
  const [totalPages, setTotalPages] = useState<number>(1);
  const [stats, setStats] = useState<Stats>();

  type Stats = {
    total: number;
    completed: number;
    available: number;
    expired: number;
  };

  const [historyPage, setHistoryPage] = useState<number>(1);
  const [historyLimit] = useState<number>(8);
  const [totalHistoryPages, setTotalHistoryPages] = useState<number>(1);

  const [pastDonations, setPastDonations] = useState<Donation[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [submitDonation, setSubmitDonation] = useState<boolean>(false);
  const [fetchingHistory, setFetchingHistory] = useState<boolean>(false);
  const [deleteDonation, setDeleteDonation] = useState<boolean>(false);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    onClose?: any;
  } | null>(null);

  async function fetchDonations() {
    setLoading(true);
    try {
      const donorID: string | null = localStorage.getItem("donorID");
      const token: string | null = localStorage.getItem("authToken");

      if (donorID && token) {
        const response = await axios.get(
          "http://127.0.0.1:3001/api/donation/get",
          {
            params: {
              donorID,
              page,
              limit,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.status) {
          setDonations(response.data.donations || []);
          setStats(response.data.stats);
          setTotalPages(Math.ceil(response.data.stats.available / limit));
        }
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  }
  // Fetch all donations on login
  useEffect(() => {
    fetchDonations();
  }, [page, limit]);

  useEffect(() => {
    if (showHistory) handlePastHistory();
  }, [historyPage]);

  // Form data
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitDonation(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/api/donation/post",
        {
          ...formData,
          quantity: parseInt(formData.quantity as unknown as string),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      if (response.data.status) {
        setDonations(
          [...donations, response.data.donation].sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
        setFormData({
          foodType: "",
          quantity: 0,
          pickupAddress: "",
          status: "available",
          expiryDate: "",
          notes: "",
        });
        fetchDonations();
        setShowAddDonation(false);
        setNotification({
          message: "Successfully donation added.",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    } finally {
      setSubmitDonation(false);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }

  // For modals
  function handleDetails(donation: any) {
    setSelectedDonation(donation);
    setModalType("details");
  }
  function handleEdit(donation: any) {
    setSelectedDonation(donation);
    setModalType("edit");
  }
  function handleDelete(donation: any) {
    setSelectedDonation(donation);
    setModalType("delete");
  }

  // Update a donation in state after editing
  function handleUpdateDonation(updatedDonation: any) {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation._id === updatedDonation._id ? updatedDonation : donation,
      ),
    );
    fetchDonations();
  }

  async function handleDeleteDonation(id: string) {
    setDeleteDonation(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/api/donation/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      if (response.data.status) {
        fetchDonations();
        setModalType(null); // close modal
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    } finally {
      setDeleteDonation(false);
    }
  }

  async function handlePastHistory() {
    setFetchingHistory(true);

    try {
      const donorID: string | null = localStorage.getItem("donorID");
      const token: string | null = localStorage.getItem("authToken");

      if (donorID && token) {
        const response = await axios.get(
          "http://127.0.0.1:3001/api/donation/history",
          {
            params: {
              donorID,
              page: historyPage,
              limit: historyLimit,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.status) {
          setPastDonations(response.data.donations || []);
          setTotalHistoryPages(Math.ceil(response.data.total / historyLimit));
        }
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setFetchingHistory(false);
    }
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {deleteDonation && <LoadingOverlay message="Deleting donation..." />}
      {fetchingHistory && <LoadingOverlay message="Fetching history..." />}
      {submitDonation && <LoadingOverlay message="Submitting donation..." />}
      {loading && <LoadingOverlay message="Fetching data..." />}
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar colorClass="bg-green-600" />
        {/* Main Content: 3 Panels */}
        <div className="flex flex-grow bg-gray-100 p-6 gap-6">
          {/* Left Panel: Summary */}
          <div className="w-1/4 space-y-4">
            <div className="bg-green-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-green-800">
                Total Donations
              </h2>
              <p className="text-2xl font-bold">{stats?.total}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-blue-800">
                Meals Rescued
              </h2>
              <p className="text-2xl font-bold">{stats?.completed}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-yellow-800">
                Active Listings
              </h2>
              <p className="text-2xl font-bold">{stats?.available}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-red-800">
                Expired Listings
              </h2>
              <p className="text-2xl font-bold">{stats?.expired}</p>
            </div>
            {/* Show History Button */}
            <button
              onClick={() => {
                setShowHistory(true);
                handlePastHistory();
              }}
              className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700 transition"
            >
              Show History
            </button>
            {/* Add Donation Button */}
            <button
              onClick={() => setShowAddDonation(true)}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add New Donation
            </button>
          </div>

          {/* Middle Panel: Active Donations */}
          <div className="w-3/4 bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Active Donations</h2>
            <div className="flex-grow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Item</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Expiry Date</th>
                    {/* <th className="p-2">Notes</th>
                  <th className="p-2">Recipient ID</th>
                  <th className="p-2">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <EmptyStateMessage />
                  ) : (
                    donations
                      .filter((donation) => donation.status === "available")
                      .map((donation) => (
                        <DonationRow
                          key={donation._id}
                          donation={donation}
                          onDetails={handleDetails}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Panel: Past Donations */}
          {/* <div className="w-1/4 bg-white rounded shadow p-4 flex flex-col"></div> */}
        </div>

        {/* Add Donation Modal */}
        {showAddDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAddDonation(false);
                  setFormData({
                    foodType: "",
                    quantity: 0,
                    pickupAddress: "",
                    status: "available",
                    expiryDate: "",
                    notes: "",
                  });
                }}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>

              <h2 className="text-2xl font-bold mb-4">Add New Donation</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Food Type */}
                <div>
                  <label className="block text-gray-700 mb-2">Food Type</label>
                  <input
                    type="text"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                {/* Pickup Address */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    className="w-full px-4 py-2 border rounded"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Optional notes..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Submit Donation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-3/4 h-3/4 flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowHistory(false);
                }}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Donation History</h2>
              {/* Scrollable list area */}
              <div className="flex-grow border rounded p-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2">Item</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Expiry Date</th>
                      <th className="p-2">Notes</th>
                      <th className="p-2">Recipient ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastDonations.length === 0 ? (
                      <EmptyStateMessage />
                    ) : (
                      pastDonations.map((donation) => (
                        <DonationRow
                          key={donation._id}
                          donation={donation}
                          onEdit={handleDelete}
                          onDetails={handleDetails}
                          onDelete={handleDelete}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination inside modal */}
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={historyPage === 1}
                  onClick={() => {
                    setHistoryPage(historyPage - 1);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {historyPage} of {totalHistoryPages}
                </span>
                <button
                  disabled={historyPage === totalHistoryPages}
                  onClick={() => {
                    setHistoryPage(historyPage + 1);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
              {/* Close Button */}
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>

              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue="Fahad Iqbal"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="fahad@example.com"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Donor"
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ✅ Modals rendered once here */}
        {modalType === "details" && selectedDonation && (
          <DetailModal
            donation={selectedDonation}
            onClose={() => setModalType(null)}
          />
        )}
        {modalType === "edit" && selectedDonation && (
          <EditModal
            donation={selectedDonation}
            onClose={() => setModalType(null)}
            onUpdate={handleUpdateDonation}
          />
        )}
        {modalType === "delete" && selectedDonation && (
          <DeleteModal
            donation={selectedDonation}
            onClose={() => setModalType(null)}
            onConfirm={handleDeleteDonation}
          />
        )}
      </div>
    </>
  );
}

export default DonorDashboard;
