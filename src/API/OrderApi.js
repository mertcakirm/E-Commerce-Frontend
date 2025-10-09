import api from "./api.js";

export const CreateOrderRequest = async (data) => {
    return await api.post(`Orders`, data)
}