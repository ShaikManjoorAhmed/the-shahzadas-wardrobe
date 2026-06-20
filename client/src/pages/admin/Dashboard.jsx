import { useState, useEffect } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/products", { params: { limit: 1 } }),
        api.get("/orders"),
      ]);

      const orders = ordersRes.data.data;
      const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        totalProducts: productsRes.data.data.total,
        totalOrders: orders.length,
        revenue,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalProducts}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <p className="text-3xl font-bold text-gold mt-2">₹{stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;