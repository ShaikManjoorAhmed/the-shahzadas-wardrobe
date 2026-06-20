import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden block"
    >
      <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
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

      <div className="p-4">
        <h3 className="font-semibold text-lg text-primary truncate">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gold font-bold text-lg">₹{product.price}</span>
          {product.stock === 0 && (
            <span className="text-red-500 text-xs font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;