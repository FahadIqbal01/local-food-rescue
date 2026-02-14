import { useEffect, useState } from "react";
import Navbar from "../../components/Global/NavBar";
import axios from "axios";
import EmptyStateMessage from "../../components/EmptyStateMessage";
import DetailModal from "../../modals/DetailModal";
import ClaimDonationModal from "../../modals/ClaimDonationModal";
import LoadingOverlay from "../../components/Global/LoadingOverlay";

type Donation = {
  _id: string;
  foodType: string;
  quantity: number;
  pickupAddress: string;
  status: "pending" | "available" | "completed" | "expired";
  expiryDate?: string;
  notes?: string;
};

function RecipientDashboard() {
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation>();
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [claimedDonations, setClaimedDonations] = useState<Donation[]>([]);
  const [totalClaimedDonations, setTotalClaimedDonations] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [historyPage, setHistoryPage] = useState<number>(1);
  const [totalHistoryPages, setTotalHistoryPages] = useState<number>(1);

  const [showDetails, setShowDetails] = useState(false);
  const [showClaim, setShowClaim] = useState(false);

  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [fetchHistory, setFetchingHistory] = useState<boolean>(false);
  const [claimDonation, setClaimDonation] = useState<boolean>(false);

  async function fetchData() {
    setFetchingData(true);

    try {
      const token: string | null = localStorage.getItem("authToken");
      const userID = localStorage.getItem("donorID");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donation/get/forRecipient`,
        {
          params: { page, limit, userID },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.status) {
        setDonations(response.data.donations || []);
        setTotalPages(Math.ceil(response.data.total / limit));
        setTotalDonations(response.data.total);
        setTotalClaimedDonations(response.data.claimed);
      }
    } catch (error) {
      console.error("Error while fetching donations: ", error);
    } finally {
      setFetchingData(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page]);

  // useEffect(() => {
  //   handlePastClaims();
  // }, [totalHistoryPages]);

  async function handleClaimDonation() {
    setClaimDonation(true);
    const token = localStorage.getItem("authToken");
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/recipient/claim`,
        {},
        {
          params: { donationID: selectedDonation?._id },
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((value) => {
        setClaimDonation(false);
        fetchData();
      })
      .catch((reason) => {
        console.error("Error while claiming: ", reason);
      });
  }

  async function handlePastClaims() {
    const token = localStorage.getItem("authToken");
    const userID = localStorage.getItem("donorID");

    setFetchingHistory(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donation/get/claims`,
        {
          params: { userID },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.status) {
        setClaimedDonations(response.data.claimedDonations);
        setTotalHistoryPages(
          Math.ceil(response.data.claimedDonations.length / limit),
        );
      }
    } catch (error) {
      console.error("Error while fetching claimed donations: ", error);
    } finally {
      setFetchingHistory(false);
    }
  }

  return (
    <>
      {claimDonation && <LoadingOverlay message="Claiming donation..." />}
      {fetchHistory && <LoadingOverlay message="Fetching claims history..." />}
      {fetchingData && <LoadingOverlay message="Fetching data..." />}
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar colorClass="bg-blue-600" />

        {/* Main Content: 3 Panels */}
        <div className="flex flex-grow bg-gray-100 p-6 gap-6">
          {/* Left Panel: Summary */}
          <div className="w-1/5 space-y-4">
            <div className="bg-green-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-green-800">
                Total Claimed
              </h2>
              <p className="text-2xl font-bold">{totalClaimedDonations}</p>
            </div>
            {/* <div className="bg-blue-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-blue-800">
                Meals Received
              </h2>
              <p className="text-2xl font-bold">{claimedDonations.length}</p>
            </div> */}
            <div className="bg-yellow-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-yellow-800">
                Active Claims
              </h2>
              <p className="text-2xl font-bold">{totalDonations}</p>
            </div>
            {/* Show History Button */}
            <button
              onClick={() => {
                setShowHistory(true);
                handlePastClaims();
              }}
              className="w-full  py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Show History
            </button>
          </div>

          {/* Middle Panel: Available Donations */}
          <div className="w-4/5 bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Available Donations</h2>
            <div className="flex-grow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Donation ID</th>
                    <th className="p-2">Item</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Pickup Address</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <EmptyStateMessage />
                  ) : (
                    donations.map((donation) => (
                      <tr key={donation._id} className="border-b">
                        <td className="p-2">{donation._id}</td>
                        <td className="p-2">{donation.foodType}</td>
                        <td className="p-2">{donation.quantity}</td>
                        <td className="p-2">{donation.pickupAddress}</td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setShowDetails(true);
                            }}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setShowClaim(true);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Claim
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
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
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-2/3 h-3/4 flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowHistory(false);
                  setTotalHistoryPages(1);
                  setHistoryPage(1);
                }}
                className="absolute top-8 right-8 text-black font-bold text-xl"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Claimed History</h2>
              <div className="flex-grow overflow-y-auto border rounded">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2">Donation ID</th>
                      <th className="p-2">Item</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Pickup Address</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimedDonations.length === 0 ? (
                      <EmptyStateMessage />
                    ) : (
                      claimedDonations.map((donation) => (
                        <tr key={donation._id} className="border-b">
                          <td className="p-2">{donation._id}</td>
                          <td className="p-2">{donation.foodType}</td>
                          <td className="p-2">{donation.quantity}</td>
                          <td className="p-2">{donation.pickupAddress}</td>
                          <td className="p-2">
                            {
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
                            }
                          </td>
                        </tr>
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
                    defaultValue="Recipient User"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="recipient@example.com"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Recipient"
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {showDetails && (
          <DetailModal
            donation={selectedDonation}
            onClose={() => setShowDetails(false)}
          />
        )}

        {showClaim && (
          <ClaimDonationModal
            donation={selectedDonation || null}
            isOpen={showClaim}
            onClose={() => setShowClaim(false)}
            onClaim={() => {
              handleClaimDonation();
            }}
          />
        )}
      </div>
    </>
  );
}

export default RecipientDashboard;
