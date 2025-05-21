import {getCookie} from "../../cookie/cookie";

const BASE_URL = "http://213.142.159.49:8083/api";
const token = getCookie("token");

export const fetchBasket = () => {
    return fetch(`${BASE_URL}/basket/get`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
            throw error;
        });
};

export const sepeteEkle = async (requestData) => {
    const response = await fetch(`${BASE_URL}/basket/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: requestData,
    });

    if (response.ok) {
        console.log("Ürün sepete eklendi");
    } else {
        throw new Error("Ürün sepete eklenemedi");
    }
}

export const sepettenSil = async (productCode) => {
    fetch(`${BASE_URL}/basket/delete/${productCode}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then((data) => {
            console.log("Item deleted:", data);
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
        });
}

export const adetArttir = async (productCode) => {
    await fetch(`${BASE_URL}/basket/increase/quantity/${productCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                console.log("adet arttırıldı")
            } else {
                console.error("Error incrementing product count");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


export const adetAzalt = async (productCode) => {
    await fetch(`${BASE_URL}/basket/decrease/quantity/${productCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                console.log("adet azaltıldı")

            } else {
                console.error("Error decrementing product count");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export const favoriEkle = async (productCode) => {
    try {
        const favoriteData = JSON.stringify({productCode: productCode});

        const response = await fetch(`${BASE_URL}/favorite/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: favoriteData,
        });
        if (!response.ok) {
            console.log("favori eklenemedi")
        }
    } catch (error) {
        console.error("Favorilere eklenirken bir hata oluştu:", error);
    }
}