import { Sheet } from '@/types';
import { GenericRepository } from './GenericRepository';

export class SheetRepository extends GenericRepository<Sheet> {
    async getByName(name: string): Promise<Sheet | undefined> {
        return this.table.where('name').equals(name).first();
    }
}