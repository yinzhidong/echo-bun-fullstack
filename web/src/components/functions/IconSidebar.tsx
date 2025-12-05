import React from 'react';

import { FunctionIcon, GearIcon } from "@phosphor-icons/react";


const IconSidebar: React.FC = () => {
  return (
    <nav className="w-12 border-r border-borderCol flex flex-col items-center py-4 bg-gray-50 z-20 flex-shrink-0">
      {/* Logo Area */}
      <div className="mb-6 cursor-pointer">
        <div className="w-7 h-7 bg-transparent flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
          </svg>
        </div>
        <div className="text-[10px] text-center mt-1 text-gray-500 scale-90">EchoYZD</div>
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col gap-6 w-full">
        <div className="nav-item group cursor-pointer flex flex-col items-center gap-1 relative text-primary">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r"></div>
          <FunctionIcon className='text-2xl group-hover:scale-110 transition-transform' />
          <span className="text-[10px] font-medium">函数</span>
        </div>
      </div>
      
      {/* Bottom Settings */}
      <div className="mt-auto mb-2 cursor-pointer text-gray-400 hover:text-gray-600">
         <GearIcon className='text-2xl ' />
      </div>
    </nav>
  );
};

export default IconSidebar;
