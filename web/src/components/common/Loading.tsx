import React from 'react';

// 定义 Loading 组件的 Props 类型
export interface LoadingProps {
  // 加载动画大小：可选 'small' | 'medium' | 'large' 或自定义数字（单位：px）
  size?: 'small' | 'medium' | 'large' | number;
  // 加载动画类型：可选 'spin'（旋转）| 'pulse'（脉冲）| 'dots'（点动画）
  type?: 'spin' | 'pulse' | 'dots';
  // 加载文本：可选，显示在动画下方
  text?: string;
  // 自定义 className：用于覆盖或扩展样式
  className?: string;
  // 是否为行内显示（默认：块级）
  inline?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  type = 'spin',
  text,
  className = '',
  inline = false,
}) => {
  // 计算动画尺寸（根据 size 类型转换为 px 值）
  const getSizeValue = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small': return 20;
      case 'large': return 48;
      default: return 32; // medium
    }
  };

  const sizeValue = getSizeValue();
  const sizeClasses = `h-${sizeValue / 4} w-${sizeValue / 4}`; // Tailwind 使用 rem，1rem = 4px

  // 渲染不同类型的加载动画
  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return (
          <div className={`${sizeClasses} bg-blue-500 rounded-full animate-pulse`} />
        );
      case 'dots':
        return (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${sizeClasses} bg-blue-500 rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      case 'spin':
      default:
        return (
          <svg
            className={`animate-spin -ml-1 mr-2 h-${sizeValue / 4} w-${sizeValue / 4} text-blue-500`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${
        inline ? 'inline-flex' : 'flex-col'
      } ${className}`}
    >
      {renderLoader()}
      {text && (
        <span className="text-gray-600 text-sm mt-2">{text}</span>
      )}
    </div>
  );
};

export default Loading;
