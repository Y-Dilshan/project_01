import { useState } from "react";

export default function CustomerOrderInfo({ order }) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* View Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-black transition"
      >
        View Order
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 sm:pt-16 z-50 px-3">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 animate-slide-in">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Order Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>Order ID:</strong> {order.orderId}</p>

              <div>
                <span className="font-medium">Status: </span>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone || "-"}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>

              <p className="sm:col-span-2">
                <strong>Address:</strong> {order.address}
              </p>

              <p className="sm:col-span-2 font-semibold text-base sm:text-lg text-gray-800">
                Total: LKR {order.total.toFixed(2)}
              </p>
            </div>

            {/* Additional Notes */}
            {order.notes && order.notes.trim() !== "" && (
              <div className="mb-6">
                <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
                  Additional Notes
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-gray-700">
                  {order.notes}
                </div>
              </div>
            )}

            {/* Items */}
            <h3 className="text-md sm:text-lg font-semibold mb-3 text-gray-800">
              Items
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {item.name}
                    </p>

                    <div className="text-xs text-gray-600 mt-1 space-y-1">
                      <p>Unit Price: LKR {item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-semibold text-gray-800">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
}