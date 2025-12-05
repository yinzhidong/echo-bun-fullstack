import React, { useState } from 'react';

import { PlusIcon, DotsThreeVerticalIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { FunctionItem } from '@/types/functions';

interface FunctionListProps {
  functions: FunctionItem[];
  currentFunctionId: number;
  onSelectFunction: (id: number) => void;
  onAddFunction: () => void;
  onShowContextMenu: (e: React.MouseEvent, functionId: number) => void;
}

const FunctionList: React.FC<FunctionListProps> = ({
  functions,
  currentFunctionId,
  onSelectFunction,
  onAddFunction,
  onShowContextMenu
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredFunctions = functions.filter(f =>
    f.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <aside className="w-60 border-r border-borderCol flex flex-col bg-gray-50 flex-shrink-0">
      {/* Header */}
      <div className="h-10 flex items-center justify-between px-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">函数列表</span>
          <span className="bg-gray-200 text-gray-600 text-xs px-1.5 rounded-md">
            {functions.length}
          </span>
        </div>
        <div className="flex gap-2 text-gray-400">
          <PlusIcon className="hover:text-primary cursor-pointer text-lg" onClick={onAddFunction} />
        </div>
      </div>

      {/* Search */}
      <div className="p-2 border-b border-gray-100 bg-gray-50">
        <div className="relative">
          <MagnifyingGlassIcon className='absolute left-2.5 top-1.5 text-gray-400 text-base'/>
          <input
            type="text"
            placeholder="请输入函数名称查询"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-8 pr-2 py-1 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {filteredFunctions.map(func => (
          <div
            key={func.id}
            className={`func-item flex items-center justify-between px-4 py-2 cursor-pointer ${func.id === currentFunctionId
                ? 'bg-blue-50 border-l-2 border-primary'
                : 'hover:bg-white'
              }`}
            onClick={() => onSelectFunction(func.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1 rounded">JS</span>
              <span className={func.id === currentFunctionId ? 'text-primary font-medium' : 'text-gray-600'}>
                {func.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {func.isDirty && <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>}
              <DotsThreeVerticalIcon
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={(e) => onShowContextMenu(e, func.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};


export default FunctionList;
