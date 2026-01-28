import React from "react";

interface ProfileSettingsProps {
  role: "donor" | "recipient" | "admin";
}

export default function ProfileSettings({ role }: ProfileSettingsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>

      {/* Profile Info Section */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              disabled
              value={role}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </section>

      {/* Security Section */}
      {role === "admin" && (
        <section className="mb-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Change Password
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                placeholder="New password"
              />
            </div>
            {/* <div>
            <label className="block text-sm font-medium">
              Two-Factor Authentication
            </label>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enable 2FA
            </button>
          </div> */}
          </form>
        </section>
      )}

      {/* Preferences Section */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Notifications</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Email</option>
              <option>SMS</option>
              <option>None</option>
            </select>
          </div>
        </div>

        {/* Role-specific preferences */}
        {role === "donor" && (
          <div className="mt-4">
            <label className="block text-sm font-medium">
              Preferred Donation Categories
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Food, Clothing"
            />
          </div>
        )}
        {role === "recipient" && (
          <div className="mt-4">
            <label className="block text-sm font-medium">
              Preferred Pickup/Delivery Option
            </label>
            <select className="w-full border rounded px-3 py-2">
              <option>Pickup</option>
              <option>Delivery</option>
            </select>
          </div>
        )}
      </section>

      {/* Activity Log Section */}
      {/* <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Updated profile info on Jan 20, 2026</li>
          <li>Logged in from new device on Jan 18, 2026</li>
          {role === "donor" && <li>Donated 10kg food on Jan 25, 2026</li>}
          {role === "recipient" && <li>Claimed 5kg food on Jan 22, 2026</li>}
          {role === "admin" && (
            <li>Approved 3 new recipients on Jan 23, 2026</li>
          )}
        </ul>
      </section> */}

      {/* Admin Settings (only for admins) */}
      {/* {role === "admin" && (
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
          <p className="text-gray-700">
            System-wide controls and analytics filters go here.
          </p>
        </section>
      )} */}
    </div>
  );
}
