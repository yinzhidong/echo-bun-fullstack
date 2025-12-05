export interface FunctionItem {
  id: number
  name: string;
  content: string;

  createdAt?: number
  updatedAt?: number

  isDirty: boolean;
  isOpen: boolean;
}

export interface ConsoleLog {
  type: 'system' | 'request';
  content: string;
  reqId?: string;
  time?: string;
}

export interface Param {
  key: string;
  value: string;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  functionId: number | null;
}

export type ParamsTab = 'query' | 'headers' | 'body';






export interface FunctionFilters {
  name: string | null | undefined
  page?: number
  pageSize?: number
}

