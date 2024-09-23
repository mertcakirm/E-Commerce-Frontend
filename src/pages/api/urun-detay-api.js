// src/api.js
const BASE_URL = 'http://213.142.159.49:8083/api';

// Utility function for making API calls
const apiFetch = async (endpoint, options = {}) => {
    
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const fetchProduct = (productId) => {
  return apiFetch(`/product/get/${productId}`);
};

export const addFavorite = (productCode, token) => {
  return apiFetch('/favorite/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productCode }),
  });
};

export const addComment = (productId, commentData, token) => {
    
  return apiFetch(`/comment/add/${productId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
};

export const addToBasket = (productCode, size, token) => {
  return apiFetch('/basket/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productCode, size }),
  });
};
