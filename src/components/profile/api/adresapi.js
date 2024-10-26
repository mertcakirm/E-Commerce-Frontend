import { getCookie, setCookie, deleteCookie } from "../../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz

const BASE_URL = "http://213.142.159.49:8083/api/address";
const token = getCookie("token");

export const AdresEkle = async (addressDTO) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressDTO),
    });

    if (response.ok) {
      const data = response;
      console.log("Address added successfully:", data);
    } else {
      console.error("Failed to add address:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AdresSil = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/address/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete address! Status: ${response.status}`);
    }

    console.log("Address deleted successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AdresGuncelle = async (addressId, addressDTO) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${addressId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressDTO),
    });

    if (response.ok) {
      const data = response;
      return { success: true, data };
    } else {
      console.error("Failed to update address:", response.statusText);
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
};

export const AdresleriGetir = async (setAddresses, setLoading) => {
  try {
    const response = await fetch(`${BASE_URL}/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setAddresses(result);
    setLoading(false);
  } catch (error) {
    console.error('Error:', error);
  }
};