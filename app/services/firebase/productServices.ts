import axios from "axios";

const API_BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products from the API', error);
        throw error;
    }
};

export const fetchProductById = async (productId: string | string[]): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ${productId}`, error);
        throw error;
    }
}