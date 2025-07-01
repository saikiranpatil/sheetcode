// import { Sheet, Submission } from '@/shared/types';
// import Dexie from 'dexie';
// import type { Table } from 'dexie';

// class MyIndexedDB extends Dexie {
//   sheets!: Table<Sheet, number>;
//   submissions!: Table<Submission, number>;

//   constructor() {
//     super("learn-dexie");
//     this.version(1).stores({
//       sheets: '++id',
//       submissions: '++id, sheetId'
//     });
//   }

//   async addSubmission(submission: Omit<Submission, 'id'>) {
//     return await this.submissions.add(submission);
//   }

//   async getAllSubmissions(): Promise<Submission[]> {
//     return await this.submissions.toArray();
//   }

//   async addSheet(sheet: Omit<Sheet, 'id'>) {
//     return await this.sheets.add(sheet);
//   }

//   async getAllSheets(): Promise<Sheet[]> {
//     return await this.sheets.toArray();
//   }
// }

// export const db = new MyIndexedDB();