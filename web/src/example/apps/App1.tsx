import { useQuery } from "@tanstack/react-query"



// https://zhuanlan.zhihu.com/p/1903831436034826305
// https://fakestoreapi.com/
export default function App1() {
    
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('https://fakestoreapi.com/products',)
            return await response.json()
        },
    })

    // 处理请求正在加载中的状态
    if (isFetching) return 'Fetching...'
    if (isPending) return 'Loading...'


    // 处理请求出错的状态
    if (error) return 'An error has occurred: ' + error.message


    return (
        <div>
            {
                JSON.stringify(data, null, 2)
            }
        </div>
    )
}
