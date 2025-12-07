import React, { useEffect } from 'react';
import { Product } from '../types/response'

// 定义 Modal Props 类型
interface ProductModalProps {
  isOpen: boolean;
  product: Product | undefined | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, product, onClose }) => {
  // 处理 ESC 键关闭 Modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // 添加事件监听
    window.addEventListener('keydown', handleEscKey);
    // 移除事件监听（清理函数）
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // 如果 Modal 未打开或产品为空，不渲染
  if (!isOpen || !product) return null;

  // 格式化价格
  const formattedPrice: string = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  // 生成星星评分
  const renderRating = (rate: number): React.ReactNode => {
    const fullStars: number = Math.floor(rate);
    const hasHalfStar: boolean = rate % 1 >= 0.5;
    const stars: React.ReactNode[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }

    const emptyStars: number = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    // 遮罩层
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // 点击遮罩层关闭
    >
      {/* Modal 内容 */}
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // 阻止事件冒泡，避免点击内容关闭
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 产品详情内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 左侧：产品图片 */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>

          {/* 右侧：产品信息 */}
          <div className="p-8">
            {/* 分类标签 */}
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-3">
              {product.category}
            </span>

            {/* 标题 */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {product.title}
            </h2>

            {/* 评分 */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderRating(product.rating.rate)}</div>
              <span className="text-sm text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* 价格 */}
            <div className="text-3xl font-bold text-blue-600 mb-6">
              {formattedPrice}
            </div>

            {/* 描述 */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <button
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                type="button"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
                type="button"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
