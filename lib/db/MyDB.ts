import Dexie, { Table } from 'dexie';
import { Sheet, Submission } from '@/shared/types';
import { GenericRepository } from '@/lib/db/GenericRepository';

export class MyIndexedDB extends Dexie {
    sheets!: Table<Sheet, number>;
    submissions!: Table<Submission, number>;

    sheetRepo!: GenericRepository<Sheet>;
    submissionRepo!: GenericRepository<Submission>;

    constructor() {
        super('sheetcode');

        this.version(1).stores({
            sheets: '++id',
            submissions: '++id,sheetId'
        });

        this.sheetRepo = new GenericRepository(this.sheets);
        this.submissionRepo = new GenericRepository(this.submissions);
    }
}

export const db = new MyIndexedDB();
