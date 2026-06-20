import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cart.items?.length || 0;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-primary text-cream px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gold" onClick={closeMenu}>
          Shahzada's Wardrobe
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="hover:text-gold">Products</Link>

          {user ? (
            <>
              <Link to="/cart" className="hover:text-gold">Cart ({itemCount})</Link>
              <Link to="/my-orders" className="hover:text-gold">My Orders</Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="hover:text-gold">Admin</Link>
              )}
              <button onClick={logout} className="hover:text-gold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gold">Login</Link>
              <Link to="/register" className="hover:text-gold">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gold text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
          <Link to="/products" onClick={closeMenu} className="hover:text-gold">Products</Link>

          {user ? (
            <>
              <Link to="/cart" onClick={closeMenu} className="hover:text-gold">Cart ({itemCount})</Link>
              <Link to="/my-orders" onClick={closeMenu} className="hover:text-gold">My Orders</Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" onClick={closeMenu} className="hover:text-gold">Admin</Link>
              )}
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="text-left hover:text-gold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="hover:text-gold">Login</Link>
              <Link to="/register" onClick={closeMenu} className="hover:text-gold">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;