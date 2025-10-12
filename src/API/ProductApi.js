import api from "./api.js";
import {getCookie} from "../components/cookie/cookie.js";
const token = getCookie("token");

export const FetchProductRequest = async (category, page) => {
    console.log("Kategori:", category);

    const categoryNumber = Number(category);

    if (category === "tum-urunler") {
        return await api.get(`/Products?pageNumber=${page}&pageSize=12`);
    }
    else if (!isNaN(categoryNumber)) {
        return await api.get(`/Offers/${categoryNumber}/products/discountmatch?pageNumber=${page}&pageSize=48`);
    }
    else {
        return await api.get(`/Products/get-by-category/${category}?pageNumber=${page}&pageSize=48`);
    }
};

export const FetchLikedProductRequest= async ()=>{
    return  await api.get(`Wishlist`, {
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
    });
}

export const GetProductCommentsRequest=async (id,pageNum)=>{
    return await  api.get(`Comment/product/${id}?pageNumber=${pageNum}&pageSize=5`);
}

export const FetchProductsByIdRequest=async (productId)=>{
    return  await api.get(`Products/${productId}`);
}

export const FetchBasketRequest= async ()=>{
    return  await api.get(`cart`);
}

export const LikeProductRequest=async (productCode)=>{
    return await api.post(`Wishlist/${productCode}`)
}

export const AddToBasketRequest=async (variantId)=>{
    return await api.post(`/Cart/add?productVariantId=${variantId}`)
}

export const AddCommentRequest=async (productCode,newComment)=>{
    const commentDto = {
        productId: productCode,
        commentText: newComment.comment,
        rating: newComment.rating
    }
    return await api.post(`Comment`,commentDto)

}

export const ResetToBasketRequest=async ()=>{
    return await api.delete(`Cart`);
}

export const DeleteProductFromBasketRequest = async (basketId)=>{
    return await api.delete(`Cart/${basketId}`);
}

export const IncreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/increase?variantId=${productCode}`);
}

export const DecreaseProductRequest=async (productCode)=>{
    return await api.put(`Cart/decrease?variantId=${productCode}`);
}