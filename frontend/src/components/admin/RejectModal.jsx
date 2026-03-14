import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { Spinner } from "@radix-ui/themes";

const RejectModal = ({ restaurant, setRejectTarget, updateStatus }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const handleReject = async (reason) => {
    setLoading(true);
    try {
      await axios.patch(
        `${serverURL}/api/restaurant/${restaurant._id}`,
        { status: "rejected", rejectionReason: reason },
        { withCredentials: true },
      );

      updateStatus(restaurant._id, "rejected", { rejectionReason: reason });
      notifySuccess(`${restaurant.name} rejected`);
    } catch (error) {
      notifyError(error?.response?.data || `${restaurant.name} reject failed`);
      console.log("Reject Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
      setRejectTarget(null);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        style={{ animation: "fadeUp 0.2s ease both" }}
      >
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
        <h3 className="text-base font-bold text-gray-700 mb-1">
          Reject Application
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Rejecting <strong className="text-gray-600">{restaurant.name}</strong>
          . Give a reason so the owner can reapply correctly.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Address could not be verified. Please provide a complete and accurate address."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-red-300 transition-colors resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => setRejectTarget(null)}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleReject(reason)}
            disabled={!reason.trim() || loading}
            className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
          >
            Reject
            <Spinner loading={loading} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
