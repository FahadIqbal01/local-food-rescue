// import axios from "axios";

function DeleteModal({ donation, onClose, onConfirm }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Delete Donation</h2>
        <p>
          Are you sure you want to delete <strong>{donation.foodType}</strong>?
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => onConfirm(donation._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-1/2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-1/2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
