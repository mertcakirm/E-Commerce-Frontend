import api from "./api.js";

export const AddAddressRequest=async (addressDTO)=>{
    return await api.post("address/add",addressDTO)
}

export const DeleteAddressRequest=async (id)=>{
    return await api.delete(`/address/delete/address/${id}`)
}

export const UpdateAddressRequest=async (addressId,addressDTO)=>{
    return await api.put(`address/update${addressId}`,addressDTO)
}

export const GetAddressRequest=async ()=>{
    return await api.get("/address/all")
}