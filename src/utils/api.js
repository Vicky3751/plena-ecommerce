import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Function to get all products
export const getAllProductsAPI = async (limit, skip) => {
    try {
        const response = await axios.get(`${BASE_URL}/products?skip=${skip}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get product details by ID
export const getProductDetailsAPI = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
