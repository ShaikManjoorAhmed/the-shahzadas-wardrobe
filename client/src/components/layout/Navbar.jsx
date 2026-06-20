import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const itemCount = cart.items?.length || 0;

  return (
    <nav className="bg-primary text-cream px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-gold">
        Shahzada's Wardrobe
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:text-gold">Products</Link>

        {user ? (
          <>
            <Link to="/cart" className="hover:text-gold">
              Cart ({itemCount})
            </Link>
            <Link to="/my-orders" className="hover:text-gold">
              My Orders
            </Link>

            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="hover:text-gold">
                Admin
              </Link>
            )}

            <button onClick={logout} className="hover:text-gold">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gold">Login</Link>
            <Link to="/register" className="hover:text-gold">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;