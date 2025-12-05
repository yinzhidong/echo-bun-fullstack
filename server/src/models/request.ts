
export class PageRequest {
    page: number;
    size: number;
    sort?: string;

    constructor(page: number, size: number, sort?: string) {
        if (page < 1) {
            this.page = 1;
        }
        if (size < 1) {
            this.page = 100;
        }

        this.page = page;
        this.size = size;
        this.sort = sort;
    }

    // 公式：offset = (页码 - 1) * 每页条数
    getOffset(): number {
        return (this.page - 1) * this.size;
    }

    // 可选：解析排序字段（比如将 "name,desc" 拆分为字段和排序方向）
    getSortInfo(): { field: string; direction: 'asc' | 'desc' } {
        if (!this.sort) {
            return {
                field: 'id',
                direction: 'desc',
            }
        }

        const [field, direction = 'asc'] = this.sort.split(',');
        if (!field) {
           return {
                field: 'id',
                direction: 'desc',
            }
        }

        return {
            field: field.trim(),
            direction: direction.toLowerCase() as 'asc' | 'desc',
        };
    }
}
