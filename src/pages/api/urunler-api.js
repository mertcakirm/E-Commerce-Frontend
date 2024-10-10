import { triggerToggleRefreshData } from "../../components/childcomponents/reflesh";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "../../components/cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz

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
      : `${BaseUrl}/category/get/${category}?page=${page}&size=20`;

  try {
    setLoading(true);
    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();

    if (data._embedded && Array.isArray(data._embedded.productDTOList)) {
      setFilteredProducts(data._embedded.productDTOList);
    } else if (Array.isArray(data.content)) {
      setFilteredProducts((prevProducts) => [...prevProducts, ...data.content]);
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
      throw new Error("Failed to add product to favorites");
    }
    const updatedFavorites = filteredProducts.map((product) =>
      product.productCode === productCode
        ? { ...product, favorite: true }
        : product
    );
    setFilteredProducts(updatedFavorites);
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
  triggerToggleRefreshData();
};
