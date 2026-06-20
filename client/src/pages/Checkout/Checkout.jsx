import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const items = cart.items || [];
  const total = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setPlacing(true);
      await api.post("/orders", { shippingAddress: form });
      await fetchCart(); // cart ab backend pe empty ho gaya, frontend state bhi refresh karo
      navigate("/my-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Shipping Form */}
      <div>
        <h1 className="text-2xl font-bold text-primary mb-6">Shipping Information</h1>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-primary text-gold font-semibold py-3 rounded-lg hover:bg-primary-light transition disabled:opacity-50"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          {items.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>
                {item.product?.name} ({item.size}) × {item.quantity}
              </span>
              <span className="font-medium">₹{item.product?.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-bold text-lg text-primary">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;