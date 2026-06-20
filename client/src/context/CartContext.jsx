import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCart(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity, size) => {
    const res = await api.post("/cart", { productId, quantity, size });
    setCart(res.data.data);
  };

  const updateCartItem = async (itemId, quantity) => {
    const res = await api.put(`/cart/${itemId}`, { quantity });
    setCart(res.data.data);
  };

  const removeCartItem = async (itemId) => {
    const res = await api.delete(`/cart/${itemId}`);
    setCart(res.data.data);
  };

  const clearCart = async () => {
    const res = await api.delete("/cart");
    setCart(res.data.data);
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateCartItem, removeCartItem, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);