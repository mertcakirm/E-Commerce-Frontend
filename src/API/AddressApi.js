import api from "./api.js";
import {getCookie} from "../components/cookie/cookie.js";
const token = getCookie("token");

export const AddAddressRequest=async (addressDTO)=>{
    return await api.post("address/add",addressDTO)
}

export const DeleteAddressRequest=async (id)=>{
    return await api.delete(`UserAddress/${id}`)
}

export const UpdateAddressRequest=async (addressId,addressDTO)=>{
    return await api.put(`address/update${addressId}`,addressDTO)
}

export const GetAddressRequest = async () => {
        return  await api.get("UserAddress", {
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
        });
};