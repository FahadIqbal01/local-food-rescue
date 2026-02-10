type DonationProps = {
  donation: {
    _id: string;
    foodType: string;
    quantity: number;
    status: string;
    pickupAddress?: string;
    expiryDate?: string;
    notes?: string;
    recipientID: string;
  };
  onDetails: (donation: any) => void;
  onEdit: (donation: any) => void;
  onDelete: (donation: any) => void;
};

function DonationRow({ donation, onDetails, onEdit, onDelete }: DonationProps) {
  return (
    <>
      {/* ✅ Only <tr> inside tbody */}
      <tr className="border-b hover:bg-gray-50 transition">
        <td className="p-2 font-medium">{donation.foodType}</td>
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
        {donation.status !== "available" && (
          <>
            <td className="p-2">{donation.expiryDate || "--"}</td>
            <td className="p-2">{donation.notes || "--"}</td>
            <td className="p-2">{donation.recipientID || "--"}</td>
          </>
        )}

        {donation.status === "available" && (
          <td className="p-2 flex gap-2">
            <button
              onClick={() => onDetails(donation)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Details
            </button>
            <button
              onClick={() => onEdit(donation)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(donation)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    </>
  );
}

export default DonationRow;
