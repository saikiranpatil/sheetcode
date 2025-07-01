import { Table, UpdateSpec } from 'dexie';

export class GenericRepository<T extends { id?: number }> {
    private table: Table<T, number>;

    constructor(table: Table<T, number>) {
        this.table = table;
    }

    add(item: Omit<T, 'id'>) {
        return this.table.add(item as T);
    }

    getAll(): Promise<T[]> {
        return this.table.toArray();
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

    async filterAndSort(
        filterFn: (item: T) => boolean,
        sortFn?: (a: T, b: T) => number
    ): Promise<T[]> {
        const all = await this.table.toArray();
        const filtered = all.filter(filterFn);
        return sortFn ? filtered.sort(sortFn) : filtered;
    }
}
