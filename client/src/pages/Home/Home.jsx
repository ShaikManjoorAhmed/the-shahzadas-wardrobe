import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/products/ProductCard";
import CategoryIcon from "../../components/ui/CategoryIcon";

const CATEGORIES = ["Kurta", "Sherwani", "Pathani Suit", "Waistcoat"];

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await api.get("/products", { params: { limit: 50 } });
      const featured = res.data.data.products.filter((p) => p.featured).slice(0, 4);
      setBestSellers(featured);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    {/* Hero Banner */}
<section className="relative text-cream py-32 px-6 text-center overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/12643001/pexels-photo-12643001.jpeg?auto=compress&cs=tinysrgb&w=1600')",
    }}
  ></div>

  {/* Dark emerald overlay for text readability */}
  <div className="absolute inset-0 bg-primary/80"></div>

  <div className="relative z-10">
    <p className="text-gold uppercase tracking-widest text-sm mb-3">Royal Ethnic Collection</p>
    <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
      The Shahzada's Wardrobe
    </h1>
    <p className="text-lg max-w-xl mx-auto mb-8 text-cream/90">
      Premium ethnic wear for the modern Shahzada — Kurtas, Sherwanis, Pathani Suits & Waistcoats, crafted for weddings & festivities.
    </p>
    <div className="flex gap-4 justify-center flex-wrap">
      <Link
        to="/products"
        className="bg-gold text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gold-light transition"
      >
        Shop Collection
      </Link>
      <Link
        to="/products?category=Sherwani"
        className="border-2 border-gold text-gold font-semibold px-8 py-3 rounded-lg hover:bg-gold hover:text-primary transition"
      >
        Wedding Sherwanis
      </Link>
    </div>
  </div>
</section>
    {/* Featured Categories */}
<section className="max-w-6xl mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold text-primary text-center mb-2">Shop By Category</h2>
  <p className="text-gray-500 text-center mb-10">Curated ethnic styles for every occasion</p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { name: "Kurta", icon: "👔" },
      { name: "Sherwani", icon: "🤵" },
      { name: "Pathani Suit", icon: "🧥" },
      { name: "Waistcoat", icon: "🎽" },
    ].map((cat) => (
      <Link
        key={cat.name}
        to={`/products?category=${encodeURIComponent(cat.name)}`}
        className="bg-primary text-cream rounded-xl py-10 text-center font-semibold text-lg hover:bg-primary-light transition shadow-lg"
      >
        <div className="flex justify-center mb-3">
  <CategoryIcon category={cat.name} />
</div>
        {cat.name}
      </Link>
    ))}
  </div>
</section>

      {/* Best Sellers */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Best Sellers</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : bestSellers.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured products yet — mark some as "Featured" from Admin Panel.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;