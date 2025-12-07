import React from 'react';
import { Product } from '../types/response';


// 定义组件 Props 类型
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onViewDetails
}) => {
    // 格式化价格（添加美元符号，保留两位小数）
    const formattedPrice: string = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(product.price);

    // 生成星星评分（返回 React 节点数组）
    const renderRating = (rate: number): React.ReactNode => {
        const fullStars: number = Math.floor(rate);
        const hasHalfStar: boolean = rate % 1 >= 0.5;
        const stars: React.ReactNode[] = [];

        // 添加满星
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
        }

        // 添加半星（如果有）
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">★</span>); // 可替换为真实半星图标
        }

        // 添加空星
        const emptyStars: number = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
        }

        return stars;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* 产品图片 */}
            <div className="h-48 overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    loading="lazy" // 优化图片加载
                />
            </div>

            {/* 产品信息 */}
            <div className="p-4">
                {/* 分类标签 */}
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
                    {product.category}
                </span>

                {/* 标题 */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                    {product.title}
                </h3>

                {/* 价格 */}
                <div className="text-xl font-bold text-blue-600 mb-2">
                    {formattedPrice}
                </div>

                {/* 评分 */}
                <div className="flex items-center mb-3">
                    <div className="flex mr-2">{renderRating(product.rating.rate)}</div>
                    <span className="text-sm text-gray-500">
                        ({product.rating.count} reviews)
                    </span>
                </div>

                {/* 描述（截断显示） */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                </p>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onAddToCart?.(product)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                        type="button" // 明确按钮类型，避免表单提交
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onViewDetails?.(product)}
                        className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                        type="button"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
