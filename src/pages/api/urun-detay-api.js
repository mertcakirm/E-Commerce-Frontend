import {getCookie} from "../../components/cookie/cookie";

const BASE_URL = 'http://213.142.159.49:8083/api';
const token = getCookie('token');

const apiFetch = async (endpoint, options = {}) => {

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            console.error(response.statusText)
        }
        var result = null
        try {
            result = await response.json();
            return result;
        } catch {
            console.error(response.statusText)
        }
        return result;

    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

export const fetchProduct = (productId) => {
    return apiFetch(`/product/get/${productId}`);
};

export const addFavorite = async (productCode) => {
    return await fetch(`${BASE_URL}/favorite/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productCode: productCode}),
    });
};

export const addComment = (productId, commentData) => {

    return apiFetch(`/comment/add/${productId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    });
};

