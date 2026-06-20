import { useState, useEffect } from "react";
import api from "../../services/api";
import ProductCard from "../../components/products/ProductCard";
const CATEGORIES = ["Kurta", "Sherwani", "Pathani Suit", "Waistcoat"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/products", { params });
      setProducts(res.data.data.products);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Our Collection</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 min-w-[200px]"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-28"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-28"
        />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center py-10">Loading products...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg ${
                    page === p ? "bg-primary text-gold" : "bg-white text-primary border"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;