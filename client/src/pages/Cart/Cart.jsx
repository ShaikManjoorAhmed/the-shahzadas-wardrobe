import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, updateCartItem, removeCartItem, loading } = useCart();
  const navigate = useNavigate();

  const items = cart.items || [];

  const total = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) return <p className="text-center py-20">Loading cart...</p>;

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/products" className="text-primary font-semibold underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              {item.product?.images?.length > 0 ? (
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-primary">{item.product?.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-gold font-bold mt-1">₹{item.product?.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 border rounded-lg"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateCartItem(item._id, item.quantity + 1)}
                className="w-8 h-8 border rounded-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeCartItem(item._id)}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">Total: ₹{total}</span>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-primary text-gold font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;