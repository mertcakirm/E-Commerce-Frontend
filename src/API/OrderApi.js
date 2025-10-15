import api from "./api.js";

export const GetMyOrdersRequest = async ()=>{
    return await api.get("/Orders");
}
export const CreateOrderRequest = async (data) => {
    return await api.post(`Orders`, data);
}