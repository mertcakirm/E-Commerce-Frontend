import { getCookie } from '../../cookie/cookie';

const token = getCookie("token");

export const fetchBasket = async () => {
    try {
        const response = await fetch('http://213.142.159.49:8083/api/basket/get', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
};


