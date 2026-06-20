import { useState, useEffect } from "react";
import api from "../../services/api";

const STATUS_COLORS = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my-orders");
      setOrders(res.data.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading orders...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  if (orders.length === 0) {
    return <p className="text-center py-20 text-gray-500">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[order.orderStatus]}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="space-y-2 border-t pt-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>
                    {item.name} ({item.size}) × {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-primary border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;