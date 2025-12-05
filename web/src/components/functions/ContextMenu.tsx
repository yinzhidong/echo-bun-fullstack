import React from 'react';

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  functionId: number | null;
  onRename: (id: number) => void;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ 
  visible, 
  x, 
  y, 
  functionId, 
  onRename, 
  onCopy, 
  onDelete, 
  onClose 
}) => {
  if (!visible || functionId === null) return null;

  const handleRename = (): void => {
    onRename(functionId);
  };

  const handleCopy = (): void => {
    onCopy(functionId);
  };

  const handleDelete = (): void => {
    onDelete(functionId);
  };

  return (
    <div 
      className="context-menu animate-fade-in"
      style={{ left: x, top: y }}
      onClick={onClose}
    >
      <div className="context-menu-item" onClick={handleRename}>
        <i className="ph ph-pencil"></i>
        <span>重命名</span>
      </div>
      <div className="context-menu-item" onClick={handleCopy}>
        <i className="ph ph-copy"></i>
        <span>复制</span>
      </div>
      <div className="context-menu-item text-red-600 hover:bg-red-50" onClick={handleDelete}>
        <i className="ph ph-trash"></i>
        <span>删除</span>
      </div>
    </div>
  );
};

export default ContextMenu;
