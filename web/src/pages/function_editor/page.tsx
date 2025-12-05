import React, { useState, useEffect } from 'react';
import { ConsoleLog, ContextMenuState, FunctionFilters, FunctionItem, Param, ParamsTab } from '@/types/functions';
import type { FunctionFilters as FunctionFiltersType } from '@/types/functions'
import { uesInvokeFunction, useCreateFunction, useFunctionList } from '@/feature/function/hooks';
import IconSidebar from '@/components/functions/IconSidebar';
import FunctionList from '@/components/functions/FunctionList';
import MainEditor from '@/components/functions/MainEditor';
import DebugPanel from '@/components/functions/DebugPanel';
import ContextMenu from '@/components/functions/ContextMenu';
import { toastError } from '@/lib/toast';
// import { ArrowRight, CreditCard, Database } from 'lucide-react';

import './style.css'


export default function FunctionPage() {

    const getDefaultFilters = (): FunctionFiltersType => {
        return {
            name: null,
            page: 1,
            pageSize: 10,
        }
    }

    const [filters, _] = useState<FunctionFilters>(getDefaultFilters())


    // 数据状态
    const [functions, setFunctions] = useState<FunctionItem[]>([]);

    // 获取日志数据
    const {
        data: functionData,
        // isLoading,
        // error,
        // refetch
    } = useFunctionList(filters)
    // console.log(`functions is ${JSON.stringify(functionData)}`);


    // 创建函数
    const {
        createChannel,
        // isLoading: isCreating,
        // error: createError,
        // clearError: clearCreateError
    } = useCreateFunction()


    const {
        invokeFunction,
        // isLoading: invokeFunctionLoading,
        // error: invokeFunctionError,
        // clearError: clearInvokeFunctionError
    } = uesInvokeFunction()



    const [currentFunctionId, setCurrentFunctionId] = useState<number>(1);
    const [openTabs, setOpenTabs] = useState<number[]>([1]);
    const [nextFunctionId, setNextFunctionId] = useState<number>(3);

    // 调试面板状态
    const [currentTab, setCurrentTab] = useState<ParamsTab>('query');
    const [queryParams, setQueryParams] = useState<Param[]>([]);
    const [headersParams, setHeadersParams] = useState<Param[]>([]);
    const [bodyContent, setBodyContent] = useState<string>('');

    // 控制台状态
    const [consoleOutput, setConsoleOutput] = useState<ConsoleLog[]>([
        { type: 'system', content: '系统准备就绪...' }
    ]);
    const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);

    // 上下文菜单状态
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({
        visible: false,
        x: 0,
        y: 0,
        functionId: null
    });

    // 获取当前函数
    const getCurrentFunction = (): FunctionItem | undefined => {
        if (!functions) {
            return
        }

        return functions.find(f => f.id === currentFunctionId);
    };

    // 选择函数
    const selectFunction = (id: number): void => {
        setCurrentFunctionId(id);

        if (!openTabs.includes(id)) {
            setOpenTabs([...openTabs, id]);
        }
    };

    // 关闭标签页
    const closeTab = (id: number, e?: React.MouseEvent): void => {
        if (e) e.stopPropagation();

        const newOpenTabs = openTabs.filter(tabId => tabId !== id);
        setOpenTabs(newOpenTabs);

        if (currentFunctionId === id && newOpenTabs.length > 0) {
            setCurrentFunctionId(newOpenTabs[newOpenTabs.length - 1]);
        }
    };

    // 添加新函数
    const addNewFunction = (): void => {
        const newFunc: FunctionItem = {
            id: nextFunctionId,
            name: `function-${nextFunctionId}`,
            content: `export default async function (ctx: FunctionContext) {
  // Your code here
  return { success: true }
}`,
            isDirty: true,
            isOpen: true
        };


        createChannel(newFunc, {
            onSuccess: () => {
                setFunctions([...functions, newFunc]);
                setNextFunctionId(nextFunctionId + 1);
                selectFunction(newFunc.id);
            },
            onError: (error) => {
                toastError(error?.message);
            }
        })
    };

    // 重命名函数
    const renameFunction = (id: number): void => {
        const func = functions.find(f => f.id === id);
        if (!func) return;
        const newName = prompt('请输入新的函数名称：', func.name);

        if (newName && newName.trim() !== '') {
            const updatedFunctions = functions.map(f =>
                f.id === id ? { ...f, name: newName.trim() } : f
            );
            
            setFunctions(updatedFunctions);
        }
    };

    // 复制函数
    const copyFunction = (id: number): void => {
        const func = functions.find(f => f.id === id);
        if (!func) return;
        const newFunc: FunctionItem = {
            id: nextFunctionId,
            name: `${func.name}-copy`,
            content: func.content,
            isDirty: true,
            isOpen: false
        };

        setFunctions([...functions, newFunc]);
        setNextFunctionId(nextFunctionId + 1);
    };

    // 删除函数
    const deleteFunction = (id: number): void => {
        if (functions.length <= 1) {
            alert('至少需要保留一个函数');
            return;
        }

        if (confirm('确定要删除这个函数吗？')) {
            const newFunctions = functions.filter(f => f.id !== id);
            const newOpenTabs = openTabs.filter(tabId => tabId !== id);

            setFunctions(newFunctions);
            setOpenTabs(newOpenTabs);

            if (currentFunctionId === id && newFunctions.length > 0) {
                const newCurrentId = newFunctions[0].id;
                setCurrentFunctionId(newCurrentId);
                if (!newOpenTabs.includes(newCurrentId)) {
                    setOpenTabs([...newOpenTabs, newCurrentId]);
                }
            }
        }
    };

    // 显示上下文菜单
    const showContextMenu = (e: React.MouseEvent, functionId: number): void => {
        e.preventDefault();
        e.stopPropagation();

        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            functionId
        });
    };

    // 关闭上下文菜单
    const closeContextMenu = (): void => {
        setContextMenu({ ...contextMenu, visible: false });
    };

    // 更新函数内容
    const updateFunctionContent = (id: number, content: string): void => {
        const updatedFunctions = functions.map(f =>
            f.id === id ? { ...f, content, isDirty: true } : f
        );
        setFunctions(updatedFunctions);
    };

    // 切换控制台
    const toggleConsole = (): void => {
        setIsConsoleOpen(!isConsoleOpen);
    };

    // 切换参数标签页
    const switchParamsTab = (tab: ParamsTab): void => {
        setCurrentTab(tab);
    };

    // 添加参数
    const addParam = (type: 'query' | 'headers'): void => {
        if (type === 'query') {
            setQueryParams([...queryParams, { key: '', value: '' }]);
        } else if (type === 'headers') {
            setHeadersParams([...headersParams, { key: '', value: '' }]);
        }
    };

    // 更新参数
    const updateParam = (type: 'query' | 'headers', index: number, field: keyof Param, value: string): void => {
        if (type === 'query') {
            const newParams = [...queryParams];
            newParams[index][field] = value;
            setQueryParams(newParams);
        } else if (type === 'headers') {
            const newParams = [...headersParams];
            newParams[index][field] = value;
            setHeadersParams(newParams);
        }
    };

    // 删除参数
    const removeParam = (type: 'query' | 'headers', index: number): void => {
        if (type === 'query') {
            setQueryParams(queryParams.filter((_, i) => i !== index));
        } else if (type === 'headers') {
            setHeadersParams(headersParams.filter((_, i) => i !== index));
        }
    };

    // 运行调试
    const runDebug = (): void => {
        // 模拟运行逻辑
        const reqId = '4143bad7-' + Math.random().toString(16).substr(2, 4) + '-' +
            Math.random().toString(16).substr(2, 4) + '-' +
            Math.random().toString(16).substr(2, 12);
        const time = (Math.random() * 50 + 10).toFixed(3);


        const currentFunction = getCurrentFunction();
        if(!currentFunction) return;
        
        invokeFunction(currentFunction.content, {
           onSuccess: (data) => {
                // toastSuccess(`函数运行成功，返回数据：${JSON.stringify(data)}`)

                // 添加到控制台输出
                setConsoleOutput(prev => [
                    ...prev,
                    {
                        type: 'request',
                        reqId,
                        time,
                        content: `RequestID: ${reqId} - Time-Usage: ${time}ms\n返回数据：${JSON.stringify(data)}`
                    }
                ]);
            },
            onError: (error) => {
                toastError(error?.message);
            }
        })
    };

    // 点击外部关闭上下文菜单
    useEffect(() => {
        console.log(`useEffect run...`);

        if (functionData) {
            setFunctions(functionData);
        }

        const handleClick = () => {
            if (contextMenu.visible) {
                closeContextMenu();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [functionData, contextMenu.visible]);


    return (
        <div className="bg-white h-screen w-screen flex overflow-hidden text-sm text-gray-700 selection:bg-teal-100">
            <IconSidebar />

            <FunctionList
                functions={functions}
                currentFunctionId={currentFunctionId}
                onSelectFunction={selectFunction}
                onAddFunction={addNewFunction}
                onShowContextMenu={showContextMenu}
            />

            <MainEditor
                functions={functions}
                currentFunctionId={currentFunctionId}
                openTabs={openTabs}
                consoleOutput={consoleOutput}
                isConsoleOpen={isConsoleOpen}
                onSelectFunction={selectFunction}
                onCloseTab={closeTab}
                onUpdateFunctionContent={updateFunctionContent}
                onToggleConsole={toggleConsole}
                currentFunction={getCurrentFunction()}
            />

            <DebugPanel
                currentFunction={getCurrentFunction()}
                currentTab={currentTab}
                queryParams={queryParams}
                headersParams={headersParams}
                bodyContent={bodyContent}
                onSwitchTab={switchParamsTab}
                onAddParam={addParam}
                onUpdateParam={updateParam}
                onRemoveParam={removeParam}
                onBodyContentChange={setBodyContent}
                onRunDebug={runDebug}
            />

            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                functionId={contextMenu.functionId}
                onRename={renameFunction}
                onCopy={copyFunction}
                onDelete={deleteFunction}
                onClose={closeContextMenu}
            />
        </div>
    );
};
