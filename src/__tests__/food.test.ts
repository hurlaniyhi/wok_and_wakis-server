import request from 'supertest';
import app from '../server' 
import { getDb } from '../database/db';

describe('Food API', () => {
    let foodId: number;

    beforeAll(async () => {
        const db = await getDb();
        await db.exec('DELETE FROM food');
    });

    afterAll(async () => {
        const db = await getDb();
        await db.close();
    });

    it('should create a new food item', async () => {
        const res = await request(app).post('/foods').send({
            title: 'Jollof Rice',
            description: 'Delicious',
            category: 'Sides',
            price: 50,
            isPopular: true,
            imageUrl: 'https://i.postimg.cc/kXmk376f/fish.jpg'
        });

        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('id');
        foodId = res.body.data.id;
    });

    it('should create multiple food items successfully', async () => {
        const bulkData = [
            {
              title: "Fried Rice",
              description: "Delicious rice with vegetables",
              category: "Fish & Shrimp",
              price: 25,
              imageUrl: "https://i.postimg.cc/kXmk376f/fish.jpg"
            },
            {
              title: "Jollof Spaghetti",
              description: "Spaghetti cooked with tomato sauce",
              category: "Fish & Shrimp",
              price: 22,
              isPopular: true,
              imageUrl: "https://i.postimg.cc/kXmk376f/fish.jpg"
            }
        ]
    
        const res = await request(app).post('/foods/bulk').send(bulkData);
    
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBe(2);
    
        for (const food of res.body.data) {
            expect(food).toHaveProperty('id');
            expect(food).toHaveProperty('title');
            expect(food).toHaveProperty('category');
        }
    });
    
    it('should return validation error for invalid item in bulk', async () => {
        const badBulk = [
            {
                title: "Good Food",
                description: "ok description",
                category: "Fish & Shrimp",
                price: 20,
                imageUrl: "https://i.postimg.cc/kXmk376f/fish.jpg"
            },
            {
                title: "Bad Food",
                description: "bad",
                category: "invalid-category",
                price: -20,
                imageUrl: "not-a-url"
            }
        ]

        const res = await request(app).post('/foods/bulk').send(badBulk);

        expect(res.status).toBe(422);
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Validation error');
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors[0]).toHaveProperty('field');
        expect(res.body.errors[0]).toHaveProperty('message');
    });

    it('should return all food items', async () => {
        const res = await request(app).get('/foods');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should fetch a food item by ID', async () => {
        const res = await request(app).get(`/foods/${foodId}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(foodId);
    });

    it('should update a food item', async () => {
        const res = await request(app).put(`/foods/${foodId}`).send({
            title: 'Fried Rice',
            price: 12
        });

        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe('Fried Rice');
    });

    it('should return 404 for non-existing food item', async () => {
        const res = await request(app).get('/foods/999999');
        expect(res.status).toBe(404);
    });

    it('should delete a food item', async () => {
        const res = await request(app).delete(`/foods/${foodId}`);
        expect(res.status).toBe(200);
    });

    it('should return 404 for deleted food item', async () => {
        const res = await request(app).get(`/foods/${foodId}`);
        expect(res.status).toBe(404);
    });

    it('should return validation error for invalid data', async () => {
        const res = await request(app).post('/foods').send({
            title: '',
            description: 'bad',
            category: 'bad',
            price: -20,
            imageUrl: 'invalid-url'
        });

        expect(res.status).toBe(422);
    });
});