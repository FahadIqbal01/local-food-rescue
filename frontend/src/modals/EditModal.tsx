import { useState } from "react";
import axios from "axios";
import LoadingOverlay from "../components/Global/LoadingOverlay";

function EditModal({ donation, onClose, onUpdate }: any) {
  const [formData, setFormData] = useState({ ...donation });

  const [editDonation, setEditDonation] = useState<boolean>(false);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setEditDonation(true);

    console.log("For Update:\n", formData);
    try {
      const res = await axios.patch(
        `http://127.0.0.1:3001/api/donation/update/${donation._id}`,
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
      if (res.data.status) {
        onUpdate(res.data.donation);
        onClose();
      }
    } catch (err) {
      console.error("Error updating donation:", err);
    } finally {
      setEditDonation(false);
    }
  }

  return (
    <>
      {editDonation && <LoadingOverlay message="Updating donation..." />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Edit Donation</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              name="pickupAddress"
              value={formData.pickupAddress || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
            <input
              name="expiryDate"
              type="date"
              value={formData.expiryDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditModal;
