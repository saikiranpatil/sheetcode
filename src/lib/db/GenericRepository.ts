import { PromiseExtended, Table, UpdateSpec } from 'dexie';

export class GenericRepository<T extends { id?: number }> {
    protected table: Table<T, number>;

    constructor(table: Table<T, number>) {
        this.table = table;
    }

    add(item: Omit<T, 'id'>) {
        return this.table.add(item as T);
    }

    bulkAdd(items: Omit<T, 'id'>[]): PromiseExtended<number> {
        return this.table.bulkAdd(items as T[]);
    }

    async getAll(
        options?: {
            filterFn?: (item: T) => boolean;
            sortFn?: (a: T, b: T) => number;
        }
    ): Promise<T[]> {
        const all = await this.table.toArray();
        const filtered = options?.filterFn ? all.filter(options.filterFn) : all;
        return options?.sortFn ? filtered.sort(options.sortFn) : filtered;
    }

    getById(id: number): Promise<T | undefined> {
        return this.table.get(id);
    }

    delete(id: number) {
        return this.table.delete(id);
    }

    update(id: number, changes: UpdateSpec<T>) {
        return this.table.update(id, changes);
    }

    count(): Promise<number> {
        return this.table.count();
    }
}
