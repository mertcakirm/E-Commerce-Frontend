import api from "./api.js";

export const RegisterRequest =async (registerDTO)=>{
    await api.post("/auth/register",registerDTO)
}

export const LoginRequest =async (loginDTO)=>{
    await api.post(`/auth/login`,loginDTO)
}