import { getDb } from '../database/db';
import { Food } from '../@types';
import helpers from '../utils/helpers';

export const createFood = async (food: Food): Promise<Food> => {
    const db = await getDb();
    const result = await db.run(
        `INSERT INTO food (title, description, category, price, isPopular, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?)`,
        food.title,
        food.description,
        food.category,
        food.price,
        food.isPopular ?? 0,
        food.imageUrl
    );

    const created = {
        id: result.lastID,
        ...food
    }

    return helpers.normalizeFood(created);
};

export const bulkCreateFoods = async (foods: Food[]): Promise<Food[]> => {
    const db = await getDb();

    const stmt = await db.prepare(`
        INSERT INTO food (title, description, category, price, isPopular, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const created: Food[] = [];

    for (const food of foods) {
        const result = await stmt.run(
            food.title,
            food.description,
            food.category,
            food.price,
            food.isPopular ?? 0,
            food.imageUrl
        );

        created.push({
            id: result.lastID!,
            ...food
        });
    }

    await stmt.finalize();

    return created.map(helpers.normalizeFood);
};

export const getAllFoods = async (): Promise<Food[]> => {
    const db = await getDb();
    const items = await db.all<Food[]>(`SELECT * FROM food`);
    return items.map(helpers.normalizeFood)
};

export const getFoodById = async (id: number): Promise<Food | undefined> => {
    const db = await getDb();
    const item = await db.get<Food>(`SELECT * FROM food WHERE id = ?`, id);
    if (!item) return undefined;
    return helpers.normalizeFood(item);
};

export const searchFood = async (searchParam: string, searchValue: string): Promise<Food[]> => {
    const db = await getDb();
    const items = await db.all<Food[]>(`SELECT * FROM food WHERE ${searchParam} = ?`, searchValue);
    return items.map(helpers.normalizeFood)
};

export const updateFood = async (id: number, food: Food): Promise<Food> => {
    food.isPopular = food.isPopular ? 1 : 0

    const db = await getDb();
    const result = await db.run(
        `UPDATE food
        SET title = ?, description = ?, category = ?, price = ?, isPopular = ?, imageUrl = ?
        WHERE id = ?`,
        food.title,
        food.description,
        food.category,
        food.price,
        food.isPopular,
        food.imageUrl,
        id
    );

    const updated = {
        id: result.changes,
        ...food
    }

    return helpers.normalizeFood(updated);
};

export const deleteFood = async (id: number): Promise<number|undefined> => {
    const db = await getDb();
    const result = await db.run(`DELETE FROM food WHERE id = ?`, id);
    return result.changes;
};