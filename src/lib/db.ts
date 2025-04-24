import { openDB } from "idb"
import { DB_NAME, DB_VERSION, DB_STORES } from "../shared/constants"
import { sheetsData } from "../shared/constants/sheets";

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(DB_STORES.SHEETS)) {
                const store = db.createObjectStore(DB_STORES.SHEETS, { keyPath: "id" });
                sheetsData.forEach(sheet => store.add(sheet))
            }

            if (!db.objectStoreNames.contains(DB_STORES.SUBMISSIONS)) {
                db.createObjectStore(DB_STORES.SUBMISSIONS, { keyPath: "id" });
            }
        }
    });
}