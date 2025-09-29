import api from "./api.js";
import {setCookie} from "../components/cookie/cookie.js";

export const RegisterRequest =async (registerDTO)=>{
    await api.post("Auth/register",registerDTO)
}

export const LoginRequest =async (loginDTO)=>{
    const logindata = await api.post(`Auth/login`,loginDTO)
    setCookie("token",logindata.data,7);
    return logindata;
}