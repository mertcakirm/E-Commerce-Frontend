// http/bridge.js
export const fetchData = async (url, setData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setData(data);
    } else {
      console.error("Failed to fetch data from:", url);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchFavoriteData = async (setFavoriteProducts) => {
  await fetchData("http://213.142.159.49:8083/api/favorite/get", setFavoriteProducts);
};

export const fetchCartData = async (setCartItems, setTotalPrice, setLoading) => {
  setLoading(true);
  await fetchData("http://213.142.159.49:8083/api/basket/get", (data) => {
    setCartItems(data.bucketItems);
    setTotalPrice(data.price);
  });
  setLoading(false);
};
