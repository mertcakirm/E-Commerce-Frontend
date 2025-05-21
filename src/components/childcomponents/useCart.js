import { useEffect, useState } from 'react';
import { fetchCartData, fetchFavoriteData } from "../http/bridge";

const useCart = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshData, setRefreshData] = useState(true);

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  };

  const fetchFullData = async () => {
    setLoading(true);
    try {
      await fetchFavoriteData(setFavoriteProducts);
      await fetchCartData(setCartItems, setTotalPrice, setLoading);
    } catch (error) {
      console.error("Data fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullData();
  }, [refreshData]);

  return {
    favoriteProducts,
    cartItems,
    loading,
    totalPrice,
    toggleRefreshData,
  };
};

export default useCart;
