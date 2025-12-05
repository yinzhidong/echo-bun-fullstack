import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { functionApi } from '@/api/function'
import { FunctionFilters, FunctionItem } from '@/types/functions'
import { useState } from 'react'
import { toast } from 'sonner'

// 获取日志数据
export const useFunctionList = (filters?: FunctionFilters) => {
    const query = useQuery({
        queryKey: ['functions', filters],
        queryFn: () => functionApi.list(filters),

        // 5分钟刷新一次数据
        refetchInterval: 5 * 60 * 1000,

        // 窗口重新获得焦点时刷新
        refetchOnWindowFocus: true,

        // 禁用重试，避免错误时过多请求
        retry: false,
    })


    return {
        ...query,
    }
}




// 创建函数
export const useCreateFunction = () => {
    const queryClient = useQueryClient()
    const [error, setError] = useState<ApiError | null>(null)

    const mutation = useMutation({
        mutationFn: (data: FunctionItem) => {
            return functionApi.create(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['channels'] })
            setError(null)
            toast.success('函数创建成功')
        },
        onError: (err: ApiError) => {
            setError(err)
            toast.error(err.message || '函数创建失败')
        },
    })

    return {
        createChannel: mutation.mutate,
        isLoading: mutation.isPending,
        error,
        clearError: () => setError(null),
    }
}



export const uesInvokeFunction = () => {
    const [error, setError] = useState<ApiError | null>(null)

    const mutation = useMutation({
        mutationFn: (code: string) => {
            return functionApi.invokeFunction(code)
        },
        onSuccess: () => {
            setError(null)
        },
        onError: (err: ApiError) => {
            setError(err)
            toast.error(err.message || '调用函数失败')
        },
    })

    return {
        invokeFunction: mutation.mutate,
        isLoading: mutation.isPending,
        error,
        clearError: () => setError(null),
    }
}


// // 获取日志详情
// export const useLogDetail = (logId: number | null) => {
//     const query = useQuery({
//         queryKey: ['logDetail', logId],
//         queryFn: () => {
//             if (!logId) return null
//             return logApi.getLogDetail(logId)
//         },
//         // 仅在有logId时启用查询
//         enabled: !!logId,
//         // 禁用自动重新获取
//         refetchOnWindowFocus: false,
//         refetchOnMount: false,
//         refetchOnReconnect: false,
//         refetchInterval: false,
//         // 禁用重试
//         retry: false,
//     })

//     return {
//         ...query,
//     }
// } 
