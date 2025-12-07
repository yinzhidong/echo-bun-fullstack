import { useQuery } from "@tanstack/react-query";
import { Product } from "@/example/apps/app1/types/response"
import * as productsAPI from "@/api/test/products";


export const useProductList = () => {
    const query = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: () => productsAPI.getProducts(),
        // 5分钟刷新一次数据
        refetchInterval: 5 * 60 * 1000,
        // 窗口重新获得焦点时刷新
        refetchOnWindowFocus: true,
        // 禁用重试，避免错误时过多请求
        retry: false,
    })

    return query
}



export const useProductDetail = (productId: number | null) => {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: (params) => {
            console.log(`run useProductDetail productId=${productId}`);
            console.log(`run useProductDetail queryFn params is=${JSON.stringify(params)}`);

            if (!productId) {
                return null;
            }
            return productsAPI.getProductByID(productId);
        },
        enabled: !!productId
    });
}


