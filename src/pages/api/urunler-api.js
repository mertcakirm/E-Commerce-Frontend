import { getCookie } from "../../components/cookie/cookie";


const BaseUrl = "http://213.142.159.49:8083/api";
const token = getCookie("token");

export const fetchProductsByCategory = async (
  category,
  page,
  setFilteredProducts,
  setTotalPages,
  setLoading
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url =
    category === "tum-urunler"
      ? `${BaseUrl}/product/all?page=${page}&size=12`
      : `${BaseUrl}/category/get/${category}?page=${page}&size=48`;

  try {
    setLoading(true);
    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();

    if (data._embedded && Array.isArray(data._embedded.productDTOList)) {
      setFilteredProducts(data._embedded.productDTOList);
    } else if (Array.isArray(data.content)) {
      setFilteredProducts(() => data.content);
    }

    if (data.page) {
      setTotalPages(data.page.totalPages);
    }
  } catch (error) {
    console.error("Product fetch error:", error);
  } finally {
    setLoading(false);
  }
};

export const handleLikeProduct = async (
  productCode,
  filteredProducts,
  setFilteredProducts
) => {
  try {
    const favoriteData = JSON.stringify({ productCode });
    const response = await fetch(`${BaseUrl}/favorite/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: favoriteData,
    });
    if (!response.ok) {
      console.error("Failed to function")
    }
    const updatedFavorites = filteredProducts.map((product) =>
      product.productCode === productCode
        ? { ...product, favorite: true }
        : product
    );
    setFilteredProducts(updatedFavorites);
    return true;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return false;
  }
};


export const handleAddToBasketApi = async (productCode,size)=>{
  try {

    const requestData = JSON.stringify({ productCode, size });

    const response = await fetch(`${BaseUrl}/basket/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: requestData,
    });
    console.log(response);
    if (response.ok) {
      console.log("Ürün sepete eklendi");
      return true;

    } else {
      return false;
    }
  } catch (error) {
    console.error("Ürün sepete eklenirken bir hata oluştu:", error);
    return false;
  }
}