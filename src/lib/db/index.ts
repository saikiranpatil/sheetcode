import Dexie, { Table } from 'dexie';
import { Sheet, Submission, User } from '@/types';
import { SheetRepository } from './SheetRepositpory';
import { SubmissionRepository } from './SubmissionRepository';
import { UserRepository } from './UserRepository';

export interface IMyDB {
    sheets: Table<Sheet, number>;
    submissions: Table<Submission, number>;
    sheetRepo: SheetRepository;
    submissionRepo: SubmissionRepository;
}

class MyDB extends Dexie implements IMyDB {
    sheets!: Table<Sheet, number>;
    submissions!: Table<Submission, number>;
    users!: Table<User, number>;

    sheetRepo!: SheetRepository;
    submissionRepo!: SubmissionRepository;
    userRepo!: UserRepository;

    constructor() {
        super('sheetcode');

        this.version(1).stores({
            sheets: '++id, name, createdAt',
            submissions: '++id, sheetId, problemId, submittedAt',
            users: '++id',
        });

        this.initializeRepositories();
    }

    private initializeRepositories() {
        this.sheetRepo = new SheetRepository(this.sheets);
        this.submissionRepo = new SubmissionRepository(this.submissions);
        this.userRepo = new UserRepository(this.users);
    }
}

const db = new MyDB();

export const getSheetRepo = () => db.sheetRepo;
export const getSubmissionRepo = () => db.submissionRepo;
export const getUserRepo = () => db.userRepo;