import { get, post } from './index'
import { FunctionFilters, FunctionItem} from '@/types/functions'


export const functionApi = {

    list: async (filters?: FunctionFilters): Promise<FunctionItem[]> => {
        const params = new URLSearchParams()

        if (filters?.page) {
            params.append('page', filters.page.toString())
        }
        if (filters?.pageSize) {
            params.append('pageSize', filters.pageSize.toString())
        }
        if (filters?.name) {
            params.append('name', filters.name)
        }

        const queryString = params.toString()
        const url = queryString ? `v1/function/list?${queryString}` : 'v1/function/list'

        const response = await get<FunctionItem[]>(url)
        return response
    },


    create: async (data: FunctionItem): Promise<FunctionItem> => {
        const response = await post<FunctionItem>('v1/function/create', data)
        return response
    },
    
    invokeFunction: async (code: string): Promise<any> => {
        const response = await post<any>('v1/function/invoke', {code})
        return response
    }
    
}
