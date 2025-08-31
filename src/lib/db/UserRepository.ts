import { User } from "@/types";
import { Table, UpdateSpec } from "dexie";

export class UserRepository {
    protected table: Table<User, number>;

    constructor(table: Table<User, number>) {
        this.table = table;
    }

    count(): Promise<number> {
        return this.table.count();
    }

    add(item: Omit<User, 'id'>) {
        return this.table.add(item as User);
    }

    async getUser(): Promise<User> {
        const users = await this.table.toArray();
        if (users.length === 0) throw new Error("No User present");
        return users[0];
    }

    update(id: number, changes: UpdateSpec<User>) {
        return this.table.update(id, changes);
    }
}