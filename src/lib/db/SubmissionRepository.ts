import { Submission } from '@/types';
import { GenericRepository } from './GenericRepository';

interface GetRecentSubmissionsParams {
    page?: number;
    pageSize?: number;
    filterFn?: (sub: Submission) => boolean;
}

interface PaginatedSubmissions {
    submissions: Submission[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export class SubmissionRepository extends GenericRepository<Submission> {
    async getBySheetId(sheetId: number): Promise<Submission[]> {
        return this.table.where('sheetId').equals(sheetId).toArray();
    }

    async getByProblemId(problemId: number): Promise<Submission[]> {
        return this.table.where('problemId').equals(problemId).toArray();
    }

    async getSubmissionsBetweenDates(start: number, end: number): Promise<Submission[]> {
        return this.table
            .where('submittedAt')
            .between(start, end)
            .toArray();
    }

    async getRecentSubmissions({
        page = 1,
        pageSize = 8,
        filterFn = () => true
    }: GetRecentSubmissionsParams): Promise<PaginatedSubmissions> {
        const allSubs = await this.table
            .orderBy('submittedAt')
            .reverse()
            .toArray();

        const filteredSubs = allSubs.filter(filterFn);
        const total = filteredSubs.length;

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedSubs = filteredSubs.slice(start, end);

        return {
            submissions: paginatedSubs,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };
    }
}