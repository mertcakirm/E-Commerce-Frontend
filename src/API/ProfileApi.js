import api from "./api.js";

export const ResetPasswordRequest = async (oldPassword,newPassword)=> {
    return await api.post(`User/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`)
}

export const GetUserProfileRequest = async () => {
    return  await api.get(`User/me`)
}