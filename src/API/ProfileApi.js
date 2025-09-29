import api from "./api.js";

export const ResetPasswordRequest = async (formData)=> {
    return await api.post(`User/change-password`, formData)
}

export const GetUserProfileRequest = async () => {
    return  await api.get(`User/me`)
}