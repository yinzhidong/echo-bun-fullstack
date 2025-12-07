import React, { useMemo, useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';

// 定义API返回类型
interface TodoApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// 定义Todo类型
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

// 定义添加Todo的请求类型
interface AddTodoRequest {
  todo: string;
  completed: boolean;
  userId: number;
}

// 定义更新Todo的请求类型
interface UpdateTodoRequest {
  todo?: string;
  completed?: boolean;
  userId?: number;
}



// https://dummyjson.com/docs/todos
const API_BASE_URL = 'https://dummyjson.com/todos';

// 获取Todos数据（支持分页）
const fetchTodos = async (pagnation: PaginationState): Promise<TodoApiResponse> => {
  const skip = pagnation.pageIndex * pagnation.pageSize;
  const response = await fetch(`${API_BASE_URL}?skip=${skip}&limit=${pagnation.pageSize}`);
  console.log("fetchTodos called with", pagnation);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// 获取单个Todo
const fetchTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todo');
  }
  return response.json();
};

// 添加Todo
const addTodo = async (todo: AddTodoRequest): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

// 更新Todo
const updateTodo = async ({ id, data }: { id: number; data: UpdateTodoRequest }): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

// 删除Todo
const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();
};


// 定义表格列
const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: info => info.getValue(),
    size: 80,
  },
  {
    accessorKey: 'todo',
    header: '任务内容',
    cell: info => info.getValue(),
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes((value as string).toLowerCase());
    },
  },
  {
    accessorKey: 'completed',
    header: '完成状态',
    cell: info => (
      <span className={`px-2 py-1 rounded-full text-xs ${info.getValue() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {info.getValue() ? '已完成' : '未完成'}
      </span>
    ),
  },
  {
    accessorKey: 'userId',
    header: '用户ID',
    cell: info => info.getValue(),
    size: 100,
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            onClick={() => row.toggleExpanded()}
          >
            {row.getIsExpanded() ? '收起' : '编辑'}
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            onClick={() => {
              // 触发删除操作

            }}
          >
            删除
          </button>
        </div>
      );
    },
  },
];



// 主TodoPage组件
const TodoPage: React.FC = () => {
  const queryClient = useQueryClient();

  // 表格状态
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });


  const {
    data: todoResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['todos', pagination.pageIndex, pagination.pageSize],
    queryFn: () => fetchTodos(pagination),
    // UI占位策略，作用范围更明确
// 切换分页 旧数据仍显示（不卡顿）
    placeholderData: keepPreviousData,
  });

  // 添加Todo的Mutation
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // 无效化并重新获取todos数据
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 更新Todo的Mutation
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // 无效化并重新获取todos数据
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 删除Todo的Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // 无效化并重新获取todos数据
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 处理添加Todo
  const handleAddTodo = (todo: AddTodoRequest) => {
    addMutation.mutate(todo);
  };

  // 处理更新Todo
  const handleUpdateTodo = (id: number, data: UpdateTodoRequest) => {
    updateMutation.mutate({ id, data });
  };

  // 处理删除Todo
  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  // 为每行数据添加onDelete方法
  const todosWithActions = (todoResponse?.todos || []).map(todo => ({
    ...todo,
    onDelete: handleDeleteTodo,
  }));

  // 创建表格实例
  const table = useReactTable({
    data: todosWithActions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    // 配置服务端分页
    pageCount: todoResponse ? Math.ceil(todoResponse.total / pagination.pageSize) : -1,
    manualPagination: true,
  });

  // 处理加载状态
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  // 处理错误状态
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        加载失败: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">任务列表</h1>

      {/* 添加Todo表单 */}
      <AddTodoForm onAdd={handleAddTodo} />

      {/* 表格容器 */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {/* 筛选行 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => {
                if (!header.column.getCanFilter()) return null;

                return (
                  <div key={header.id} className="flex flex-col min-w-[200px]">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {header.column.columnDef.header as string} 筛选
                    </label>
                    <input
                      type="text"
                      value={(header.column.getFilterValue() as string) || ''}
                      onChange={e => header.column.setFilterValue(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`筛选 ${header.column.columnDef.header as string}`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 表格 */}
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center cursor-pointer">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {/* 展开行 - 用于编辑 */}
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length} className="p-0 border-b border-gray-200">
                      <EditTodoForm
                        todo={row.original}
                        onClose={() => row.toggleExpanded(false)}
                        onUpdate={handleUpdateTodo}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* 空状态 */}
        {table.getRowModel().rows.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            没有找到匹配的任务
          </div>
        )}

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            显示 {table.getRowModel().rows.length} 条，共 {todoResponse?.total || 0} 条，共 {table.getPageCount()} 页
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              首页
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              末页
            </button>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700"
            >
              {[5, 10, 20, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  每页 {pageSize} 条
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


// 编辑Todo组件
const EditTodoForm: React.FC<{
  todo: Todo;
  onClose: () => void;
  onUpdate: (id: number, data: UpdateTodoRequest) => void;
}> = ({ todo, onClose, onUpdate }) => {

  const [formData, setFormData] = useState<UpdateTodoRequest>({
    todo: todo.todo,
    completed: todo.completed,
    userId: todo.userId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(todo.id, formData);
    onClose();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="text-lg font-semibold mb-4">编辑任务</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务内容</label>
          <input
            type="text"
            value={formData.todo}
            onChange={(e) => setFormData({ ...formData, todo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">用户ID</label>
          <input
            type="number"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={formData.completed}
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="completed" className="text-sm font-medium text-gray-700">
            已完成
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            保存
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

// 添加Todo组件
const AddTodoForm: React.FC<{ onAdd: (todo: AddTodoRequest) => void }> = ({ onAdd }) => {
  const [formData, setFormData] = useState<AddTodoRequest>({
    todo: '',
    completed: false,
    userId: 1, // 默认用户ID
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    // 重置表单
    setFormData({ todo: '', completed: false, userId: 1 });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4">添加新任务</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务内容</label>
          <input
            type="text"
            value={formData.todo}
            onChange={(e) => setFormData({ ...formData, todo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入任务内容"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">用户ID</label>
          <input
            type="number"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入用户ID"
            required
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            添加任务
          </button>
        </div>
      </form>
    </div>
  );
};



export default TodoPage;
