import { initDB } from "../lib/db";

export const getAllFromStore = async (storeName: string) => {
    const db = await initDB();
    return db.getAll(storeName);
};

export const addToStore = async (storeName: string, data: any) => {
    const db = await initDB();
    return db.add(storeName, data);
};

export const updateInStore = async (storeName: string, data: any) => {
    const db = await initDB();
    return db.put(storeName, data);
};

export const deleteFromStore = async (storeName: string, id: string) => {
    const db = await initDB();
    return db.delete(storeName, id);
};

export const getFromStoreById = async (storeName: string, id: string) => {
    const db = await initDB();
    return db.get(storeName, id);
};
