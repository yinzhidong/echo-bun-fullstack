import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/response';
import ProductModal from './ProductModal';



// https://www.doubao.com/chat/32526742315977218
// https://zhuanlan.zhihu.com/p/1903831436034826305
// https://fakestoreapi.com/
const ProductList: React.FC = () => {

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isPending, error, data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products',)
      return await response.json()
    },
  })

  const { data: selectedProduct, isFetching } = useQuery<Product>({
    queryKey: ['product', selectedProductId],
    queryFn: async ({queryKey}) => {
      const [, id] = queryKey;
      console.log(`query product queryKey=${JSON.stringify(queryKey)}`);

      if (!id) {
        return null;
      }

      const response = await fetch(`https://fakestoreapi.com/products/${id}`,)
      return await response.json()
    },
    enabled: !!selectedProductId
  });


  // 处理请求正在加载中的状态
  if (isFetching) return 'Fetching...'
  if (isPending) return 'Loading...'


  // 处理请求出错的状态
  if (error) return 'An error has occurred: ' + error.message

  // 处理加入购物车（类型安全：参数必须是 Product 类型）
  const handleAddToCart = (product: Product): void => {
    console.log('Added to cart:', product);
    // 实际业务逻辑：调用 API 或更新状态
  };

  // 处理查看详情
  const handleViewDetails = (product: Product): void => {
    console.log('View details:', product);
    setIsModalOpen(true);

    // 改变这个状态即可
    setSelectedProductId(product.id);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            // 传递查看详情方法
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* 产品详情 Modal */}
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductList;
