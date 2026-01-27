import { useState } from "react";

function DonorDashboard() {
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const activeDonations = [
    { id: 1, item: "Bread Loaves", quantity: 20, status: "Pending" },
    { id: 2, item: "Rice Bags", quantity: 10, status: "Claimed" },
    { id: 1, item: "Bread Loaves", quantity: 20, status: "Pending" },
    { id: 2, item: "Rice Bags", quantity: 10, status: "Claimed" },
    { id: 1, item: "Bread Loaves", quantity: 20, status: "Pending" },
    { id: 2, item: "Rice Bags", quantity: 10, status: "Claimed" },
    { id: 1, item: "Bread Loaves", quantity: 20, status: "Pending" },
    { id: 2, item: "Rice Bags", quantity: 10, status: "Claimed" },
    { id: 1, item: "Bread Loaves", quantity: 20, status: "Pending" },
    { id: 2, item: "Rice Bags", quantity: 10, status: "Claimed" },
  ];

  const pastDonations = [
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
    { id: 1, item: "Vegetables", quantity: 15, status: "Delivered" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Delivered" },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Food Rescue - Donor</h1>
        <div className="space-x-6 flex items-center">
          {/* Navigation Links */}
          <a href="/donor" className="hover:underline">
            Dashboard
          </a>
          {/* Action Buttons (modals) */}
          <button
            onClick={() => setShowProfile(true)}
            className="hover:underline cursor-pointer bg-transparent border-none"
          >
            Profile
          </button>
          <a href="/" className="hover:underline">
            Logout
          </a>
        </div>
      </nav>
      {/* Main Content: 3 Panels */}
      <div className="flex flex-grow bg-gray-100 p-6 gap-6">
        {/* Left Panel: Summary */}
        <div className="w-1/4 space-y-4">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800">
              Total Donations
            </h2>
            <p className="text-2xl font-bold">32</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-blue-800">
              Meals Rescued
            </h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-yellow-800">
              Active Listings
            </h2>
            <p className="text-2xl font-bold">{activeDonations.length}</p>
          </div>
        </div>

        {/* Middle Panel: Active Donations */}
        <div className="w-2/4 bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Active Donations</h2>
          <div className="flex-grow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Item</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeDonations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="p-2">{donation.item}</td>
                    <td className="p-2">{donation.quantity}</td>
                    <td className="p-2">{donation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Previous
            </button>
            <span className="text-gray-600">Page 1 of 5</span>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Next
            </button>
          </div>
          {/* Add Donation Button */}
          <button
            onClick={() => setShowAddDonation(true)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add New Donation
          </button>
        </div>

        {/* Right Panel: Past Donations */}
        <div className="w-1/4 bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Past Donations</h2>
          <div className="flex-grow">
            <ul className="space-y-2">
              {pastDonations.slice(0, 13).map((donation) => (
                <li
                  key={donation.id}
                  className="flex justify-between border-b py-1"
                >
                  <span>
                    {donation.item} ({donation.quantity})
                  </span>
                  <span className="text-green-700 font-semibold">
                    {donation.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Show History Button */}
          <button
            onClick={() => setShowHistory(true)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Show History
          </button>
        </div>
      </div>

      {/* Add Donation Modal */}
      {showAddDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
            {/* Close Button (Top Right) */}
            <button
              onClick={() => setShowAddDonation(false)}
              className="absolute top-8 right-8 text-black font-bold text-xl"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4">Add New Donation</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
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
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-2/3 h-3/4 flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setShowHistory(false)}
              className="absolute top-8 right-8 text-black font-bold text-xl"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Donation History</h2>
            {/* Scrollable list area */}
            <div className="flex-grow overflow-y-auto border rounded p-4">
              <ul className="space-y-2">
                {pastDonations.map((donation) => (
                  <li
                    key={donation.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {donation.item} ({donation.quantity})
                    </span>
                    <span className="text-green-700 font-semibold">
                      {donation.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pagination inside modal */}
            <div className="flex justify-between items-center mt-4">
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                Previous
              </button>
              <span className="text-gray-600">Page 1 of 10</span>
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
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
    </div>
  );
}

export default DonorDashboard;
