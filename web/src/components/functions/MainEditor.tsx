import { ConsoleLog, FunctionItem } from '@/types/functions';
import React, { useRef, useEffect } from 'react';
import CodeEditor from './CodeEditor';


interface MainEditorProps {
  functions: FunctionItem[];
  currentFunctionId: number;
  openTabs: number[];
  consoleOutput: ConsoleLog[];
  isConsoleOpen: boolean;
  onSelectFunction: (id: number) => void;
  onCloseTab: (id: number, e?: React.MouseEvent) => void;
  onUpdateFunctionContent: (id: number, content: string) => void;
  onToggleConsole: () => void;
  currentFunction: FunctionItem | undefined;
}

const MainEditor: React.FC<MainEditorProps> = ({
  functions,
  currentFunctionId,
  openTabs,
  consoleOutput,
  isConsoleOpen,
  onSelectFunction,
  onCloseTab,
  onUpdateFunctionContent,
  onToggleConsole,
  currentFunction
}) => {
  const codeAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // 更新行号
  const updateLineNumbers = (): void => {
    if (codeAreaRef.current && lineNumbersRef.current) {
      const lines = codeAreaRef.current.value.split('\n').length;
      lineNumbersRef.current.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }
  };

  // 同步滚动
  const syncScroll = (): void => {
    if (codeAreaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = codeAreaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    updateLineNumbers();
  }, [currentFunction]);

  const openFunctions = functions.filter(f => openTabs.includes(f.id));

  return (
    <main className="flex-1 flex flex-col bg-white min-w-0">
      {/* Tabs */}
      <header className="h-9 flex items-center border-b border-borderCol bg-gray-50 select-none overflow-x-auto">
        {openFunctions.map(func => (
          <div 
            key={func.id}
            className={`h-full px-4 flex items-center gap-2 ${
              func.id === currentFunctionId 
                ? 'bg-white border-t-2 border-t-primary text-primary' 
                : 'text-gray-500 hover:bg-gray-100'
            } border-r border-gray-200 min-w-fit cursor-pointer transition-colors`}
            onClick={() => onSelectFunction(func.id)}
          >
            <i className="ph ph-file-ts text-lg"></i>
            <span className={`text-xs ${func.id === currentFunctionId ? 'font-medium' : ''}`}>
              {func.name}
            </span>
            {func.isDirty && <i className="ph ph-dot text-red-500 text-2xl leading-3"></i>}
            <i 
              className="ph ph-x ml-1 text-gray-400 hover:text-gray-600 rounded p-0.5 hover:bg-gray-100"
              onClick={(e) => onCloseTab(func.id, e)}
            ></i>
          </div>
        ))}
      </header>
      
      {/* Toolbar */}
      <div className="h-10 border-b border-borderCol flex items-center justify-between px-4 bg-white">
        <div className="flex items-center text-xs text-gray-400">
          <span>Functions / {currentFunction?.name || ''}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-white bg-primary px-3 py-1.5 rounded hover:bg-primaryHover shadow-sm transition-colors">
            <i className="ph ph-rocket-launch"></i>
            发布
          </button>
        </div>
      </div>
      
      {/* Code Editor */}
      <CodeEditor
        currentFunction={currentFunction}
        onUpdateFunctionContent={onUpdateFunctionContent}
        codeAreaRef={codeAreaRef}
        lineNumbersRef={lineNumbersRef}
        onSyncScroll={syncScroll}
        onUpdateLineNumbers={updateLineNumbers}
      />
      
      {/* Bottom Console */}
      <div 
        className={`border-t border-borderCol flex flex-col bg-white transition-all duration-300 ${
          isConsoleOpen ? 'h-48' : 'h-8'
        }`}
      >
        {/* Console Header */}
        <div 
          className="h-8 flex items-center justify-between px-4 border-b border-gray-100 bg-gray-50 cursor-pointer"
          onClick={onToggleConsole}
        >
          <div className="flex items-center gap-4 text-xs font-medium text-gray-700 h-full">
            <span className="h-full flex items-center border-b-2 border-primary text-gray-900 px-1">Console</span>
            <span className="h-full flex items-center text-gray-400 hover:text-gray-600 px-1">Problems</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <i className="ph ph-trash hover:text-gray-600"></i>
            <i 
              className={`ph ph-caret-down hover:text-gray-600 transition-transform ${
                isConsoleOpen ? '' : 'rotate-180'
              }`}
            ></i>
          </div>
        </div>
        
        {/* Console Output */}
        {isConsoleOpen && (
          <div className="flex-1 overflow-y-auto p-2 font-mono text-xs bg-white">
            {consoleOutput.map((log, index) => (
              <div key={index} className="text-gray-400 italic p-2">
                {log.content}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Status Bar */}
      <footer className="h-7 border-t border-borderCol bg-gray-50 flex items-center justify-between px-3 text-[10px] text-gray-500 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
            <i className="ph ph-globe"></i>En
          </span>
        </div>
      </footer>
    </main>
  );
};

export default MainEditor;
