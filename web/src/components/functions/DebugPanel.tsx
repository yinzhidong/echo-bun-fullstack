import React from 'react';
import { FunctionItem, Param, ParamsTab } from '@/types/functions';
import { TrashIcon, PlayCircleIcon, PlusIcon, ArrowsOutSimpleIcon, CaretDownIcon } from "@phosphor-icons/react";

interface DebugPanelProps {
  currentFunction: FunctionItem | undefined;
  currentTab: ParamsTab;
  queryParams: Param[];
  headersParams: Param[];
  bodyContent: string;
  onSwitchTab: (tab: ParamsTab) => void;
  onAddParam: (type: 'query' | 'headers') => void;
  onUpdateParam: (type: 'query' | 'headers', index: number, field: keyof Param, value: string) => void;
  onRemoveParam: (type: 'query' | 'headers', index: number) => void;
  onBodyContentChange: (content: string) => void;
  onRunDebug: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  currentFunction,
  currentTab,
  queryParams,
  headersParams,
  bodyContent,
  onSwitchTab,
  onAddParam,
  onUpdateParam,
  onRemoveParam,
  onBodyContentChange,
  onRunDebug
}) => {
  const renderQueryParams = (): React.JSX.Element[] => {
    return queryParams.map((param, index) => (
      <div key={index} className="grid grid-cols-2 p-0 border-b border-gray-100">
        <input
          type="text"
          placeholder="key"
          value={param.key}
          onChange={(e) => onUpdateParam('query', index, 'key', e.target.value)}
          className="p-1.5 outline-none text-gray-600 focus:bg-blue-50"
        />
        <div className="flex border-l border-gray-100">
          <input
            type="text"
            placeholder="value"
            value={param.value}
            onChange={(e) => onUpdateParam('query', index, 'value', e.target.value)}
            className="p-1.5 outline-none text-gray-600 focus:bg-blue-50 flex-1"
          />
          <TrashIcon className='text-gray-400 hover:text-red-500 cursor-pointer p-1.5' onClick={() => onRemoveParam('query', index)} />
        </div>
      </div>
    ));
  };

  const renderHeadersParams = (): React.JSX.Element[] => {
    return headersParams.map((param, index) => (
      <div key={index} className="grid grid-cols-2 p-0 border-b border-gray-100">
        <input
          type="text"
          placeholder="key"
          value={param.key}
          onChange={(e) => onUpdateParam('headers', index, 'key', e.target.value)}
          className="p-1.5 outline-none text-gray-600 focus:bg-blue-50"
        />
        <div className="flex border-l border-gray-100">
          <input
            type="text"
            placeholder="value"
            value={param.value}
            onChange={(e) => onUpdateParam('headers', index, 'value', e.target.value)}
            className="p-1.5 outline-none text-gray-600 focus:bg-blue-50 flex-1"
          />

          <TrashIcon className='text-gray-400 hover:text-red-500 cursor-pointer p-1.5' onClick={() => onRemoveParam('headers', index)} />
        </div>
      </div>
    ));
  };

  return (
    <aside className="w-80 border-l border-borderCol bg-white flex flex-col flex-shrink-0">
      {/* Debug Header */}
      <div className="h-10 flex items-center px-4 border-b border-gray-100 bg-white">
        <div className="flex gap-4 text-xs font-medium">
          <span className="text-gray-800 border-b-2 border-gray-800 py-2.5 cursor-pointer">接口调试</span>
        </div>
      </div>

      {/* Request Controls */}
      <div className="p-4 border-b border-borderCol bg-white">
        {/* Method & Run */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <select
              id="httpMethod"
              className="appearance-none w-20 bg-gray-100 border border-gray-200 text-gray-700 text-xs rounded-l px-2 py-1.5 outline-none focus:border-primary font-bold"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={`/${currentFunction?.name || ''}`}
              className="absolute left-20 top-0 w-[calc(100%-5rem)] h-full border border-l-0 border-gray-200 rounded-r px-2 text-xs text-gray-500 outline-none focus:border-primary"
              readOnly
            />
          </div>
          <button
            onClick={onRunDebug}
            className="bg-primary hover:bg-primaryHover text-white text-xs px-4 py-1.5 rounded flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >

            <PlayCircleIcon className='text-sm' />
            运行
          </button>
        </div>

        {/* Params Tabs */}
        <div className="flex gap-4 text-xs border-b border-gray-100 mb-3">
          <span
            className={`pb-1 cursor-pointer ${currentTab === 'query'
              ? 'border-b-2 border-primary font-medium text-primary'
              : 'text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => onSwitchTab('query')}
          >
            Query
          </span>
          <span
            className={`pb-1 cursor-pointer ${currentTab === 'headers'
              ? 'border-b-2 border-primary font-medium text-primary'
              : 'text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => onSwitchTab('headers')}
          >
            Headers
          </span>
          <span
            className={`pb-1 cursor-pointer ${currentTab === 'body'
              ? 'border-b-2 border-primary font-medium text-primary'
              : 'text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => onSwitchTab('body')}
          >
            Body
          </span>
        </div>

        {/* Params Container */}
        <div>
          {/* Query Params */}
          {currentTab === 'query' && (
            <div className="border border-gray-200 rounded text-xs">
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 p-1.5 text-gray-500">
                <div>参数名</div>
                <div className="pl-2 border-l border-gray-200">值</div>
              </div>
              {renderQueryParams()}
              <div
                className="p-1.5 text-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onAddParam('query')}
              >
                <PlusIcon />添加
              </div>
            </div>
          )}

          {/* Headers Params */}
          {currentTab === 'headers' && (
            <div className="border border-gray-200 rounded text-xs">
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 p-1.5 text-gray-500">
                <div>Header名</div>
                <div className="pl-2 border-l border-gray-200">值</div>
              </div>
              {renderHeadersParams()}
              <div
                className="p-1.5 text-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onAddParam('headers')}
              >
                <PlusIcon />添加
              </div>
            </div>
          )}

          {/* Body Params */}
          {currentTab === 'body' && (
            <div className="border border-gray-200 rounded text-xs">
              <div className="bg-gray-50 border-b border-gray-200 p-1.5 text-gray-500">
                Request Body (JSON)
              </div>
              <textarea
                value={bodyContent}
                onChange={(e) => onBodyContentChange(e.target.value)}
                className="w-full p-2 font-mono text-xs outline-none focus:bg-blue-50 min-h-[120px]"
                placeholder='{\n  "key": "value"\n}'
              />
            </div>
          )}
        </div>
      </div>

      {/* Run Result */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <div className="h-8 flex items-center justify-between px-3 border-b border-gray-200 bg-white">
          <span className="text-xs font-bold text-gray-700">运行结果</span>
          <div className="flex gap-2 text-gray-400">
            <ArrowsOutSimpleIcon className="cursor-pointer hover:text-primary" />
            <CaretDownIcon className="cursor-pointer hover:text-primary" />
          </div>
        </div>
        <div className="flex-1 p-3 overflow-auto font-mono text-xs relative">
          <div className="text-gray-400 mt-4 text-center">点击运行查看结果...</div>
        </div>
      </div>
    </aside>
  );
};

export default DebugPanel;
