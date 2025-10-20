import api from "./api.js";
import {getCookie} from "../components/cookie/cookie.js";

export const GetMyOrdersRequest = async (page)=>{
    return await api.get(`/Orders?pageNumber=${page}&pageSize=8`);
}
export const CreateOrderRequest = async (data) => {
    return await api.post(`Orders`, data);
}

export const GetOrderRequest = async (orderId) => {
    const token = getCookie("token");
    return await api.get(`Orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}