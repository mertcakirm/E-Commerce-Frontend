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
    return  await api.get(`/favorite/get`);
}

export const FetchProductsByIdRequest=async (productId)=>{
    return  await api.get(`/product/get/${productId}`);
}

export const FetchBasketRequest= async ()=>{
    return  await api.get(`cart`);
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

export const ResetToBasketRequest=async ()=>{
    return await api.delete(`Cart`);
}

export const IncreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/increase?productId=${productCode}`);
}

export const DecreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/decrease?productId=${productCode}`);
}