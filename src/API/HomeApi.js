import api from "./api.js";

export const FetchSliderDataRequest = async () => {
    return  await api.get('SliderCart/sliders');
}

export const FetchCategoriesRequest = async () => {
    return await api.get('Category');
}

export const FetchCartDataRequest = async () => {
    return  await api.get('SliderCart/carts');

}