import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function OrdersInfo({ order }) {

  const [open, setOpen] = useState(false);
  const [notes,setNotes] = useState(order.notes);
  const [status,setStatus] = useState(order.status);

  // Helper to get colored badge for status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <>
      {/* View Info Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition shadow-md"
      >
        View Info
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-16 z-50">
          <div className="bg-white w-175 max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-6 animate-slide-in">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-500 transition text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Order Summary Card */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 shadow-sm grid grid-cols-2 gap-4 text-sm">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>

                    <select
                        id="status"
                        value={status} // bind to a state variable
                        onChange={(e) => setStatus(e.target.value)} // update state on change
                        className={`px-2 py-1 text-xs font-semibold rounded-full focus:outline-none border border-transparent ${getStatusColor(status)}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
              </div>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone || "-"}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p className="col-span-2"><strong>Address:</strong> {order.address}</p>
              <div className="col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        value={notes} // bind to your state
                        onChange={(e) => setNotes(e.target.value)} // update state on change
                        placeholder="Enter notes for this order..."
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={3}
                    />
              </div>
              <p className="col-span-2 font-semibold text-lg text-gray-700">
                Total: LKR {order.total.toFixed(2)}
              </p>
            </div>

            {/* Items Table */}
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Items</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm ">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.productId} className="border-b border-b-gray-200 hover:bg-gray-50 transition">
                      <td className="p-2">
                        <img src={item.image} className="w-12 h-12 object-cover rounded-lg" />
                      </td>
                      <td className="p-2 font-medium text-gray-700">{item.name}</td>
                      <td className="p-2">LKR {item.price.toFixed(2)}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2 font-semibold">LKR {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {
                ((order.notes !== notes && notes.trim() !== "") || (order.status!==status))&&(
                <button
                    onClick={
                        ()=>{
                            const token = localStorage.getItem("token");

                            axios.put(import.meta.env.VITE_BACKEND_URL+`/orders/${order.orderId}`,{
                                status:status,
                                notes:notes
                            },{
                                headers:{
                                Authorization: "Bearer " + token}
                            }).then((response)=>{
                                toast.success("Order updated successfully!");
                                setOpen(false);
                            }).catch(()=>{
                                toast.error("failed to update order. Please try again!");

                            })
                        }
                    }
                        className="px-6 py-2 mt-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
                                    hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 "
                        >
                        Save Changes
                </button>)
            }  
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
}