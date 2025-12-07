// 定义产品类型
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: ProductRating;
}

// 定义产品评分类型
export interface ProductRating {
    rate: number;
    count: number;
}
