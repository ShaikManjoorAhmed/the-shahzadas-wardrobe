import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      setMessage("Please select a size");
      return;
    }

    try {
      setAdding(true);
      setMessage("");
      await addToCart(product._id, quantity, selectedSize);
      setMessage("Added to cart!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>

          <p className="text-2xl font-bold text-gold mt-4">₹{product.price}</p>

          <p className="text-gray-700 mt-4">{product.description}</p>

          <p className="mt-4 text-sm">
            Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">{product.stock} available</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>

          {/* Sizes */}
          <div className="mt-6">
            <p className="font-medium mb-2">Select Size:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size
                      ? "bg-primary text-gold border-primary"
                      : "bg-white text-primary border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-3">
            <p className="font-medium">Quantity:</p>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border rounded-lg"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 border rounded-lg"
            >
              +
            </button>
          </div>

          {message && <p className="mt-4 text-sm font-medium text-primary">{message}</p>}

          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="mt-6 w-full bg-primary text-gold font-semibold py-3 rounded-lg hover:bg-primary-light transition disabled:opacity-50"
          >
            {adding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;