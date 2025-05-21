import api from "./api.js";

export const FetchSliderDataRequest = async () => {
    const response = await api.get('/slider/main/get');
    return response;
}

export const FetchCategoriesRequest = async () => {
    const response = await api.get('/category/admin/get/all');
    return response;
}

export const FetchCartDataRequest = async () => {
    const response = await api.get('/product/get/cart');
    return response;
}