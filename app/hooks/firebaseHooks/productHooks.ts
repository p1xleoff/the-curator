import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../../services/firebase/productServices";


//fetch all products
export const useProducts = () =>{ 
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(),
    });
};

//fetch product by id
export const useProduct = (productId: string | string[]) => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId,
    });
};