import React, { useEffect } from 'react';
import { FunctionItem } from '@/types/functions';

interface CodeEditorProps {
  currentFunction: FunctionItem | undefined;
  onUpdateFunctionContent: (id: number, content: string) => void;
  onSyncScroll: () => void;
  onUpdateLineNumbers: () => void;
  // codeAreaRef: React.RefObject<HTMLTextAreaElement> | null;
  // lineNumbersRef: React.RefObject<HTMLDivElement> | null;

  codeAreaRef: any;
  lineNumbersRef: any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  currentFunction,
  onUpdateFunctionContent,
  codeAreaRef,
  lineNumbersRef,
  onSyncScroll,
  onUpdateLineNumbers
}) => {
  useEffect(() => {
    if (codeAreaRef?.current && currentFunction) {
      codeAreaRef.current.value = currentFunction.content;
      onUpdateLineNumbers();
    }
  }, [currentFunction, codeAreaRef, onUpdateLineNumbers]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (currentFunction) {
      onUpdateFunctionContent(currentFunction.id, e.target.value);
    }
    onUpdateLineNumbers();
  };

  return (
    <div 
      className="flex-1 flex overflow-hidden code-editor-container bg-white"
      onClick={() => codeAreaRef?.current?.focus()}
    >
      {/* Line Numbers */}
      <div 
        ref={lineNumbersRef}
        className="w-12 pt-4 bg-gray-50 flex flex-col items-end line-numbers font-mono text-xs leading-6"
      >
        1
      </div>
      
      {/* Textarea */}
      <textarea 
        ref={codeAreaRef}
        className="code-area flex-1 pt-4 pl-4 leading-6 border-none focus:ring-0 text-sm font-mono"
        spellCheck="false"
        autoComplete="off"
        onChange={handleCodeChange}
        onScroll={onSyncScroll}
      />
    </div>
  );
};

export default CodeEditor;
