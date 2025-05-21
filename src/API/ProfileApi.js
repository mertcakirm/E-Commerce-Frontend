import api from "./api.js";

export const UpdateProfileRequest = async (formData)=> {
    return await api.put(`/user/update`, formData)
}

export const GetUserProfileRequest = async () => {
    const response = await api.get(`/user/profile`)
    return response;
}