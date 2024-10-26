const BASE_URL = 'http://213.142.159.49:8083/api';

export const fetchSliderData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/slider/main/get`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch slider data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching slider data:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/category/admin/get/all`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return null;
  }
};

export const fetchCartData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/get/cart`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch cart data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return null;
  }
};
