export const fetchFavoriteData = async (setFavoriteproduct) => {
    await fetchData("http://213.142.159.49:8083/api/favorite/get", setFavoriteproduct);
  };

export const fetchCartData = async (setCartItems,setTotalprice,setLoading) => {
    setLoading(true);
    await fetchData("http://213.142.159.49:8083/api/basket/get", (data) => {
      setCartItems(data.bucketItems);
      setTotalprice(data.price);
    });
    setLoading(false);
  };