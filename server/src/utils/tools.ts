


export function jsonResult(data: any = null, code: number = 200, message: string = 'success'): Record<string, any> {
    const result = {
        code,
        data,
        message
    }
    return result
}


export function jsonOK(data: any = null): Record<string, any> {
    return jsonResult(data)
}



export function jsonFail(code: number = 500, message: string = 'fail'): Record<string, any> {
    return jsonResult(null, code, message)
}


export function jsonClientError(message: string = 'fail'): Record<string, any> {
    return jsonFail(400, message)
}


export function jsonServerError(message: string = 'fail'): Record<string, any> {
    return jsonFail(500, message)
}

export function utc8(): Date {
    const date = new Date(new Date().getTime() + (3600000 * 8)); 
    return date
}