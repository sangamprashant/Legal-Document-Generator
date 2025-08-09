import { useState } from "react";
import { useAuth } from "../../providers/AuthenticationContext";

const SettingComponent = () => {
  const [activeTab, setActiveTab] = useState<"email" | "password">("email");
  const { token } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");

  const [currentPasswordForPassword, setCurrentPasswordForPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/update-email", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail,
          currentPassword: currentPasswordForEmail,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Email updated successfully!");
      } else {
        setMessage(`❌ ${data.message || "Failed to update email"}`);
      }
    } catch (err) {
      setMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPasswordForPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully!");
      } else {
        setMessage(`❌ ${data.message || "Failed to update password"}`);
      }
    } catch (err) {
      setMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors duration-200 ${
            activeTab === "email"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Change Email
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors duration-200 ${
            activeTab === "password"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-xl p-6">
        {message && <p className="mb-4 text-center">{message}</p>}

        {activeTab === "email" && (
          <form className="space-y-4" onSubmit={handleUpdateEmail}>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={currentPasswordForEmail}
                onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
                placeholder="Enter current password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Email"}
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form className="space-y-4" onSubmit={handleUpdatePassword}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={currentPasswordForPassword}
                onChange={(e) => setCurrentPasswordForPassword(e.target.value)}
                placeholder="Enter current password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SettingComponent;
