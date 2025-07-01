import { GenericRepository } from '@/lib/db/GenericRepository';
import { UpdateSpec } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export const useRepository = <T extends { id?: number }>(
    repo: GenericRepository<T>,
    filter: (t: T) => boolean = () => true,
    sort?: (a: T, b: T) => number
) => {
    return {
        data: useLiveQuery(() => repo.filterAndSort(filter, sort)),
        getById: (id: number) => useLiveQuery(() => repo.getById(id)),
        add: (item: Omit<T, 'id'>) => repo.add(item),
        update: (id: number, changes: UpdateSpec<T>) => repo.update(id, changes),
        delete: (id: number) => repo.delete(id),
    };
};
