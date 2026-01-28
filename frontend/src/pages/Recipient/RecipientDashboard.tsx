import { useState } from "react";
import Navbar from "../../components/Global/NavBar";

function RecipientDashboard() {
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const availableDonations = [
    { id: 1, item: "Bread Loaves", quantity: 20, donor: "Bakery A" },
    { id: 2, item: "Rice Bags", quantity: 10, donor: "Store B" },
  ];

  const claimedDonations = [
    { id: 1, item: "Vegetables", quantity: 15, status: "Received" },
    { id: 2, item: "Milk Cartons", quantity: 30, status: "Received" },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar role="recipient" userName="XYZ" colorClass="bg-blue-600" />

      {/* Main Content: 3 Panels */}
      <div className="flex flex-grow bg-gray-100 p-6 gap-6">
        {/* Left Panel: Summary */}
        <div className="w-1/4 space-y-4">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800">
              Total Claimed
            </h2>
            <p className="text-2xl font-bold">25</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-blue-800">
              Meals Received
            </h2>
            <p className="text-2xl font-bold">95</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-yellow-800">
              Active Claims
            </h2>
            <p className="text-2xl font-bold">{claimedDonations.length}</p>
          </div>
        </div>

        {/* Middle Panel: Available Donations */}
        <div className="w-2/4 bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Available Donations</h2>
          <div className="flex-grow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Item</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Donor</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {availableDonations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="p-2">{donation.item}</td>
                    <td className="p-2">{donation.quantity}</td>
                    <td className="p-2">{donation.donor}</td>
                    <td className="p-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Claim
                      </button>
                    </td>
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
        </div>

        {/* Right Panel: Claimed Donations */}
        <div className="w-1/4 bg-white rounded shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Claimed Donations</h2>
          <div className="flex-grow">
            <ul className="space-y-2">
              {claimedDonations.map((donation) => (
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Show History
          </button>
        </div>
      </div>

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
            <h2 className="text-2xl font-bold mb-4">Claimed History</h2>
            <div className="flex-grow overflow-y-auto border rounded p-4">
              <ul className="space-y-2">
                {claimedDonations.map((donation) => (
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
    </div>
  );
}

export default RecipientDashboard;
