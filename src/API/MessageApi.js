import api from "./api.js";

export const MessageSendRequest = async (data) => {
    return await api.post("Message/create", data);
}