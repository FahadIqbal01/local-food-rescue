import { useState } from "react";
import Navbar from "../../components/Global/NavBar";

function AdminDashboard() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const donors = [
    { id: 1, name: "Bakery A", donations: 12, email: "bakeryA@email.com" },
    { id: 2, name: "Store B", donations: 8, email: "storeB@email.com" },
  ];

  const recipients = [
    { id: 1, name: "Charity X", claimed: 20, email: "charity@email.com" },
    { id: 2, name: "NGO Y", claimed: 15, email: "ngo@email.com" },
  ];

  const donorsDonations = [
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Rice Bags", quantity: 10, status: "Pending" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
  ];

  const recipientClaims = [
    {
      donationId: 1,
      recipient: "Charity House",
      item: "Milk Cartons",
      quantity: 25,
      status: "Received",
    },
    {
      donationId: 1,
      recipient: "Food Bank",
      item: "Vegetables",
      quantity: 15,
      status: "Pending",
    },
    {
      donationId: 2,
      recipient: "Community Center",
      item: "Bread Loaves",
      quantity: 30,
      status: "Received",
    },
    {
      donationId: 1,
      recipient: "Charity House",
      item: "Milk Cartons",
      quantity: 25,
      status: "Received",
    },
    {
      donationId: 1,
      recipient: "Food Bank",
      item: "Vegetables",
      quantity: 15,
      status: "Pending",
    },
    {
      donationId: 2,
      recipient: "Community Center",
      item: "Bread Loaves",
      quantity: 30,
      status: "Received",
    },
    {
      donationId: 1,
      recipient: "Charity House",
      item: "Milk Cartons",
      quantity: 25,
      status: "Received",
    },
    {
      donationId: 1,
      recipient: "Food Bank",
      item: "Vegetables",
      quantity: 15,
      status: "Pending",
    },
    {
      donationId: 2,
      recipient: "Community Center",
      item: "Bread Loaves",
      quantity: 30,
      status: "Received",
    },
  ];

  // States for middle panel's tables.
  const [activeTab, setActiveTab] = useState<
    "donors" | "recipients" | "donations"
  >("donations");

  // States for tabs in Donor's Modal.
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [donorTab, setDonorTab] = useState<
    "profile" | "donations" | "activity"
  >("profile");

  // States for tabs in Recipient's Modal.
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [recipientTab, setRecipientTab] = useState<
    "profile" | "claims" | "activity"
  >("profile");

  // Donor Donations Pagination
  const [donorCurrentPage, setDonorCurrentPage] = useState(1);
  const donationsPerPage: number = 7;
  const totalPages: number = Math.ceil(
    donorsDonations.length / donationsPerPage,
  );

  // Recipient Claims Pagination
  const [recipientCurrentPage, setRecipientCurrentPage] = useState(1);
  const recipientClaimsPerPage: number = 5; // adjust as needed
  const recipientTotalPages: number = Math.ceil(
    recipientClaims.length / recipientClaimsPerPage,
  );

  // Middle Panel Donations Pagination
  const [middleCurrentPage, setMiddleCurrentPage] = useState(1);
  const middleDonationsPerPage: number = 8; // adjust as needed
  const middleTotalPages: number = Math.ceil(
    donorsDonations.length / middleDonationsPerPage,
  );

  // State for Selected Donation
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [donationTab, setDonationTab] = useState<
    "details" | "activity" | "claims"
  >("details");

  // Donation Claims Pagination
  const [claimsCurrentPage, setClaimsCurrentPage] = useState(1);
  const claimsPerPage = 5; // adjust as needed
  const claimsTotalPages = Math.ceil(recipientClaims.length / claimsPerPage);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar role="admin" userName="ABC" colorClass="bg-purple-600" />

      {/* Main Content: 3 Panels */}
      <div className="flex flex-grow bg-gray-100 p-6 gap-6">
        {/* Left Panel: Summary */}
        <div className="w-1/4 space-y-4">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800">
              Total Donors
            </h2>
            <p className="text-2xl font-bold">{donors.length}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-blue-800">
              Total Recipients
            </h2>
            <p className="text-2xl font-bold">{recipients.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-yellow-800">
              Total Donations
            </h2>
            <p className="text-2xl font-bold">{donorsDonations.length}</p>
          </div>
        </div>

        {/* Middle Panel: Management */}
        {/* ---------------- Middle Panel: Management ---------------- */}
        <div className="w-2/4 bg-white rounded shadow p-4 flex flex-col">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("donations")}
              className={`px-4 py-2 rounded ${
                activeTab === "donations"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => setActiveTab("donors")}
              className={`px-4 py-2 rounded ${
                activeTab === "donors"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Donors
            </button>
            <button
              onClick={() => setActiveTab("recipients")}
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Total Donations</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id} className="border-b">
                    <td className="p-2">{donor.name}</td>
                    <td className="p-2">{donor.email}</td>
                    <td className="p-2">{donor.donations}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setSelectedDonor(donor);
                          setDonorTab("profile");
                        }}
                        className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Recipients Table */}
          {activeTab === "recipients" && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Total Claimed</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient) => (
                  <tr key={recipient.id} className="border-b">
                    <td className="p-2">{recipient.name}</td>
                    <td className="p-2">{recipient.email}</td>
                    <td className="p-2">{recipient.claimed}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setSelectedRecipient(recipient);
                          setRecipientTab("profile");
                        }}
                        className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    {donorsDonations
                      .slice(
                        (middleCurrentPage - 1) * middleDonationsPerPage,
                        middleCurrentPage * middleDonationsPerPage,
                      )
                      .map((donation) => (
                        <tr key={donation.id} className="border-b">
                          <td className="p-2">{donation.item}</td>
                          <td className="p-2">{donation.quantity}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                donation.status === "Delivered"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-yellow-200 text-yellow-800"
                              }`}
                            >
                              {donation.status}
                            </span>
                          </td>
                          <td className="p-2 space-x-2">
                            <button
                              onClick={() => {
                                setSelectedDonation(donation);
                                setDonationTab("details"); // default tab
                              }}
                              className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                              View
                            </button>

                            <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                              Edit
                            </button>
                            <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination fixed at bottom */}
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={middleCurrentPage === 1}
                  onClick={() =>
                    setMiddleCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {middleCurrentPage} of {middleTotalPages}
                </span>
                <button
                  disabled={middleCurrentPage === middleTotalPages}
                  onClick={() =>
                    setMiddleCurrentPage((prev) =>
                      Math.min(prev + 1, middleTotalPages),
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Analytics */}
        <div className="w-1/4 bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Impact Analytics</h2>
          <div className="flex-grow space-y-2">
            <p className="text-gray-700">Meals Rescued: 215</p>
            <p className="text-gray-700">Active Listings: 12</p>
          </div>
          <button
            onClick={() => setShowAnalytics(true)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Show Analytics
          </button>
        </div>
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
              onClick={() => setSelectedDonor(null)}
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
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                    <p>
                      <span className="font-semibold">Total Donations:</span>
                      <span className="ml-2 px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold">
                        {selectedDonor.donations}
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
                        {donorsDonations
                          .slice(
                            (donorCurrentPage - 1) * donationsPerPage,
                            donorCurrentPage * donationsPerPage,
                          )
                          .map((donation, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="p-2">{donation.item}</td>
                              <td className="p-2">{donation.quantity}</td>
                              <td className="p-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    donation.status === "Delivered"
                                      ? "bg-green-200 text-green-800"
                                      : "bg-yellow-200 text-yellow-800"
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
                      disabled={donorCurrentPage === 1}
                      onClick={() =>
                        setDonorCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Page {donorCurrentPage} of {totalPages}
                    </span>
                    <button
                      disabled={donorCurrentPage === totalPages}
                      onClick={() =>
                        setDonorCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages),
                        )
                      }
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
                        {recipientClaims
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
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination fixed at bottom */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      disabled={recipientCurrentPage === 1}
                      onClick={() =>
                        setRecipientCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Page {recipientCurrentPage} of {recipientTotalPages}
                    </span>
                    <button
                      disabled={recipientCurrentPage === recipientTotalPages}
                      onClick={() =>
                        setRecipientCurrentPage((prev) =>
                          Math.min(prev + 1, recipientTotalPages),
                        )
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
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-3/4 h-[80vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDonation(null)}
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
                      {selectedDonation.item}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {selectedDonation.quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Status updated to</span>{" "}
                      {selectedDonation.status}
                    </p>
                    <p>
                      <span className="font-semibold">Donation created on</span>{" "}
                      {Date()}
                    </p>
                    {/* <p>
                      <span className="font-semibold">
                        Status updated to {selectedDonation.status}
                      </span>{" "}
                    </p> */}
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
                        {recipientClaims
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
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination fixed at bottom */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      disabled={claimsCurrentPage === 1}
                      onClick={() =>
                        setClaimsCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Page {claimsCurrentPage} of {claimsTotalPages}
                    </span>
                    <button
                      disabled={claimsCurrentPage === claimsTotalPages}
                      onClick={() =>
                        setClaimsCurrentPage((prev) =>
                          Math.min(prev + 1, claimsTotalPages),
                        )
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {/* {donationTab === "activity" && (
                <ul className="space-y-2">
                  <li className="text-gray-700">
                    Donation created on Jan 20, 2026
                  </li>
                  <li className="text-gray-700">
                    Status updated to {selectedDonation.status}
                  </li>
                </ul>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
