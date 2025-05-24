import api from "./api.js";

export const FetchProductRequest=async (category,page)=>{
    if(category===null){
        const response = await api.get(`/product/all?page=${page}&size=12`);
        return response;
    }else{
        const response = await api.get(`/category/get/${category}?page=${page}&size=48`);
        return response;
    }
}

export const FetchLikedProductRequest= async ()=>{
    const response = await api.get(`/favorite/get`);
    return response;
}

export const FetchProductsByIdRequest=async (productId)=>{
    const response = await api.get(`/product/get/${productId}`);
    return response;
}

export const FetchBasketRequest= async ()=>{
    const response = await api.get(`/basket/get`);
    return response;
}

export const LikeProductRequest=async (productCode)=>{
    return await api.post("/favorite/add",productCode)
}

export const AddToBasketRequest=async (productCode,size)=>{
    const requestData = JSON.stringify({productCode, size});
    return await api.post("/basket/add",requestData)
}

export const AddCommentRequest=async (productCode,commentData)=>{
    return await api.post(`/comment/add/${productCode}`,commentData)

}

export const DeleteToBasketRequest=async (productCode)=>{
    return await api.delete(`/basket/delete/${productCode}`);
}

export const IncreaseProductRequest=async (productCode)=>{
    return await api.get(`/basket/increase/quantity/${productCode}`);
}

export const DecreaseProductRequest=async (productCode)=>{
    return await api.get(`/basket/decrease/quantity/${productCode}`);
}