function DetailModal({ donation, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Donation Details</h2>
        <p>
          <strong>Food:</strong> {donation.foodType}
        </p>
        <p>
          <strong>Quantity:</strong> {donation.quantity}
        </p>
        <p>
          <strong>Status:</strong> {donation.status}
        </p>
        <p>
          <strong>Pickup Address:</strong> {donation.pickupAddress || "N/A"}
        </p>
        <p>
          <strong>Expiry Date:</strong> {donation.expiryDate || "N/A"}
        </p>
        <p>
          <strong>Notes:</strong> {donation.notes || "None"}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailModal;
