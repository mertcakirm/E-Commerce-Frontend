import api from "./api.js";

export const GetMyOrdersRequest = async (page)=>{
    return await api.get(`/Orders?pageNumber=${page}&pageSize=8`);
}
export const CreateOrderRequest = async (data) => {
    return await api.post(`Orders`, data);
}