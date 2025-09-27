import api from "./api.js";

export const FetchProductRequest=async (category,page)=>{
    console.log(category)
    if(category==="tum-urunler"){
        const response = await api.get(`/Products?pageNumber=${page}&pageSize=12`);
        return response;
    }else{
        const response = await api.get(`/Products/get-by-category/${category}?pageNumber=${page}&pageSize=48`);
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
    const response = await api.get(`cart`);
    return response;
}

export const LikeProductRequest=async (productCode)=>{
    return await api.post("/favorite/add",productCode)
}

export const AddToBasketRequest=async (productCode,variantId)=>{
    return await api.post(`/Cart/add??productId=${productCode}&productVariantId=${variantId}`)
}

export const AddCommentRequest=async (productCode,commentData)=>{
    return await api.post(`/comment/add/${productCode}`,commentData)

}

export const DeleteToBasketRequest=async (productCode)=>{
    return await api.delete(`/basket/delete/${productCode}`);
}

export const IncreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/increase?productId=${productCode}`);
}

export const DecreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/decrease?productId=${productCode}`);
}