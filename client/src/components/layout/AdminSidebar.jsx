import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium ${
      isActive ? "bg-gold text-primary" : "text-cream hover:bg-primary-light"
    }`;

  return (
    <div className="flex min-h-[80vh]">
      <aside className="w-64 bg-primary p-4">
        <h2 className="text-gold text-xl font-bold mb-6 px-2">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            Manage Products
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            Manage Orders
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;