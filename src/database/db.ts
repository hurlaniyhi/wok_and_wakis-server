import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

sqlite3.verbose();

export let db: Database | null = null;

export const getDb = async (): Promise<Database> => {
    if (!db) {
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS food (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                isPopular INTEGER,
                imageUrl TEXT NOT NULL
            )
        `);
    }

    return db;
};