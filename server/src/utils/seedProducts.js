import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const products = [
  // ===== KURTAS =====
  { name: "Ivory Linen Kurta", description: "Breathable linen kurta perfect for daytime festive wear.", price: 1499, category: "Kurta", sizes: ["S","M","L","XL"], images: [px("36811366")], stock: 35, featured: true },
  { name: "Mustard Silk Kurta", description: "Rich silk kurta with subtle thread embroidery on collar.", price: 2199, category: "Kurta", sizes: ["M","L","XL","XXL"], images: [px("29138637")], stock: 28, featured: false },
  { name: "Royal Blue Cotton Kurta", description: "Classic cotton kurta with mandarin collar.", price: 1299, category: "Kurta", sizes: ["S","M","L","XL"], images: [px("6374107")], stock: 40, featured: false },
  { name: "Maroon Embroidered Kurta", description: "Hand-embroidered maroon kurta for festive occasions.", price: 2799, category: "Kurta", sizes: ["M","L","XL"], images: [px("31371016")], stock: 20, featured: true },
  { name: "White Festive Kurta", description: "Pure white kurta with delicate gold thread work.", price: 1899, category: "Kurta", sizes: ["S","M","L","XL","XXL"], images: [px("18059052")], stock: 32, featured: false },
  { name: "Olive Green Kurta", description: "Earthy olive green kurta, ideal for casual ethnic days.", price: 1399, category: "Kurta", sizes: ["M","L","XL"], images: [px("9035317")], stock: 25, featured: false },
  { name: "Beige Linen Kurta", description: "Minimalist beige linen kurta with side slits.", price: 1599, category: "Kurta", sizes: ["S","M","L"], images: [px("11749504")], stock: 30, featured: false },
  { name: "Black Chikankari Kurta", description: "Elegant black kurta with fine chikankari hand embroidery.", price: 2999, category: "Kurta", sizes: ["M","L","XL","XXL"], images: [px("9035317")], stock: 15, featured: true },

  // ===== SHERWANIS =====
  { name: "Royal Black Sherwani", description: "Premium black sherwani with gold embroidery, perfect for weddings.", price: 4999, category: "Sherwani", sizes: ["M","L","XL"], images: [px("35635693")], stock: 18, featured: true },
  { name: "Maroon Velvet Sherwani", description: "Luxurious velvet sherwani with intricate zari work.", price: 7999, category: "Sherwani", sizes: ["M","L","XL","XXL"], images: [px("3998177")], stock: 12, featured: true },
  { name: "Ivory Wedding Sherwani", description: "Bridal-groom ivory sherwani with pearl detailing.", price: 8999, category: "Sherwani", sizes: ["S","M","L","XL"], images: [px("12643001")], stock: 10, featured: true },
  { name: "Golden Bandhgala Sherwani", description: "Statement golden bandhgala for grand celebrations.", price: 6499, category: "Sherwani", sizes: ["M","L","XL"], images: [px("18016521")], stock: 14, featured: false },
  { name: "Navy Blue Sherwani", description: "Sophisticated navy sherwani with silver thread work.", price: 5499, category: "Sherwani", sizes: ["M","L","XL","XXL"], images: [px("7051198")], stock: 16, featured: false },
  { name: "Wine Embroidered Sherwani", description: "Deep wine-colored sherwani with floral embroidery.", price: 6999, category: "Sherwani", sizes: ["M","L","XL"], images: [px("37439727")], stock: 11, featured: false },
  { name: "Pastel Pink Sherwani", description: "Modern pastel pink sherwani for contemporary weddings.", price: 5999, category: "Sherwani", sizes: ["S","M","L"], images: [px("11749556")], stock: 13, featured: false },
  { name: "Emerald Green Sherwani", description: "Rich emerald sherwani with gold buttons and brocade.", price: 7499, category: "Sherwani", sizes: ["M","L","XL","XXL"], images: [px("12779716")], stock: 9, featured: true },

  // ===== PATHANI SUITS =====
  { name: "Classic White Pathani Suit", description: "Traditional white pathani suit, soft cotton blend.", price: 1799, category: "Pathani Suit", sizes: ["M","L","XL"], images: [px("17585739")], stock: 27, featured: false },
  { name: "Charcoal Grey Pathani Suit", description: "Sharp charcoal pathani suit for festive evenings.", price: 1999, category: "Pathani Suit", sizes: ["S","M","L","XL"], images: [px("32522921")], stock: 22, featured: false },
  { name: "Sky Blue Pathani Suit", description: "Light and breezy sky blue pathani for summer events.", price: 1699, category: "Pathani Suit", sizes: ["M","L","XL"], images: [px("14835968")], stock: 24, featured: false },
  { name: "Beige Embroidered Pathani", description: "Beige pathani suit with subtle collar embroidery.", price: 2299, category: "Pathani Suit", sizes: ["M","L","XL","XXL"], images: [px("26858870")], stock: 19, featured: true },
  { name: "Black Pathani Suit", description: "Sleek all-black pathani suit, minimal and elegant.", price: 1899, category: "Pathani Suit", sizes: ["S","M","L"], images: [px("19743719")], stock: 21, featured: false },
  { name: "Mustard Pathani Suit", description: "Vibrant mustard pathani for a festive statement.", price: 2099, category: "Pathani Suit", sizes: ["M","L","XL"], images: [px("17585739")], stock: 17, featured: false },
  { name: "Maroon Pathani Suit", description: "Rich maroon pathani suit with matching churidar.", price: 2399, category: "Pathani Suit", sizes: ["M","L","XL","XXL"], images: [px("19743719")], stock: 15, featured: false },

  // ===== WAISTCOATS =====
  { name: "Gold Brocade Waistcoat", description: "Statement gold brocade waistcoat for weddings.", price: 1999, category: "Waistcoat", sizes: ["S","M","L","XL"], images: [px("17490194")], stock: 23, featured: true },
  { name: "Maroon Velvet Waistcoat", description: "Plush velvet waistcoat with subtle embroidery.", price: 2299, category: "Waistcoat", sizes: ["M","L","XL"], images: [px("17998615")], stock: 18, featured: false },
  { name: "Navy Printed Waistcoat", description: "Printed navy waistcoat, pairs well with kurtas.", price: 1599, category: "Waistcoat", sizes: ["S","M","L","XL","XXL"], images: [px("17490194")], stock: 26, featured: false },
  { name: "Black Bandhani Waistcoat", description: "Traditional bandhani print waistcoat in black.", price: 1799, category: "Waistcoat", sizes: ["M","L","XL"], images: [px("17998615")], stock: 20, featured: false },
  { name: "Ivory Embroidered Waistcoat", description: "Ivory waistcoat with fine gold thread embroidery.", price: 2499, category: "Waistcoat", sizes: ["S","M","L"], images: [px("26839465")], stock: 14, featured: true },
  { name: "Olive Textured Waistcoat", description: "Textured olive waistcoat for a modern ethnic look.", price: 1699, category: "Waistcoat", sizes: ["M","L","XL","XXL"], images: [px("26839465")], stock: 19, featured: false },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    await Product.deleteMany({});
    console.log("🗑️  Old products cleared");

    await Product.insertMany(products);
    console.log(`🎉 ${products.length} products inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();