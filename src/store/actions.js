// Set All Products
export const setAllProducts = (data) => {
    return {
        type: 'SET_ALL_PRODUCTS',
        payload: data,
    };
};
// Set All Products
export const setSelectedProduct = (data) => {
    return {
        type: 'SET_SELCTED_PRODUCT',
        payload: data,
    };
};
// Set All Fav Products
export const setAllFavProducts = (data) => {
    return {
        type: 'SET_ALL_FAV_PRODUCTS',
        payload: data,
    };
};
// Set All Cart Products
export const setAllCartProducts = (data) => {
    ////console.log(data, "-------")
    return {
        type: 'SET_ALL_CART_PRODUCTS',
        payload: data,
    };
};

// Remove  Fav Product
export const removeFavProduct = (data) => {
    return {
        type: 'REMOVE_FAV_PRODUCT',
        payload: data,
    };
};
// Remove Cart Product
export const removeCartProduct = (data) => {
    return {
        type: 'REMOVE_CART_PRODUCT',
        payload: data,
    };
};


//Delete Cart 
export const deleteCartProducts = () => {
    return {
        type: 'DELETE_CART_PRODUCT',
        payload: {},
    };
};

