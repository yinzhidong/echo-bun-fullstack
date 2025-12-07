import { CreateProduct } from "@/example/apps/app1/types/request"
import { Product } from "@/example/apps/app1/types/response"

const BASE_URL = 'https://fakestoreapi.com/products'


// 获取所有商品
export async function getProducts(): Promise<Product[]> {
    const response = await fetch(BASE_URL)
    return await response.json()
}

// 获取单个商品
export async function getProductByID(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/${id}`)
    return await response.json()
}

// 分页获取商品
export async function getProductByPage(page: number): Promise<Product[]> {
    // 因为产品一共只有 20 条，为了达到多页获取的效果，所以每页最多显示 5 条
    if (page > 4) {
        return []
    }
    const limit = 5;
    const response = await fetch(`${BASE_URL}?limit=${page * limit}`)
    return await response.json()
}

// 创建商品
export async function createProduct(product: CreateProduct): Promise<Product> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    return await response.json()
}
