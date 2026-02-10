interface Donation {
  _id: string;
  foodType: string;
  quantity: number;
  pickupAddress: string;
  status: "pending" | "available" | "completed" | "expired";
  expiryDate?: string;
  notes?: string;
}

interface ClaimDonationModalProps {
  donation: Donation | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}

function ClaimDonationModal({
  donation,
  isOpen,
  onClose,
  onClaim,
}: ClaimDonationModalProps) {
  if (!isOpen || !donation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Claim Donation
        </h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to claim this donation?
        </p>

        <div className="bg-gray-100 rounded p-3 mb-4">
          <p>
            <strong>Item:</strong> {donation.foodType}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            <strong>Status:</strong> {donation.status}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onClaim();
              onClose();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClaimDonationModal;
