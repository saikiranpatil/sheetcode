import Dexie, { Table } from 'dexie';
import { Sheet, Submission } from '@/types';
import { SheetRepository } from './SheetRepositpory';
import { SubmissionRepository } from './SubmissionRepository';

export interface IMyDB {
    sheets: Table<Sheet, number>;
    submissions: Table<Submission, number>;
    sheetRepo: SheetRepository;
    submissionRepo: SubmissionRepository;
}

class MyDB extends Dexie implements IMyDB {
    sheets!: Table<Sheet, number>;
    submissions!: Table<Submission, number>;

    sheetRepo!: SheetRepository;
    submissionRepo!: SubmissionRepository;

    constructor() {
        super('sheetcode');

        this.version(1).stores({
            sheets: '++id, name, createdAt',
            submissions: '++id, sheetId, problemId, submittedAt'
        });

        this.initializeRepositories();
    }

    private initializeRepositories() {
        this.sheetRepo = new SheetRepository(this.sheets);
        this.submissionRepo = new SubmissionRepository(this.submissions);
    }
}

const db = new MyDB();

export const getSheetRepo = () => db.sheetRepo;
export const getSubmissionRepo = () => db.submissionRepo;