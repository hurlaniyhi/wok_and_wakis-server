import express from 'express';
import * as handler from '../handlers';

const router = express.Router();

router.post('/', handler.createFood);
router.get('/', handler.getAllFoods);
router.get('/search', handler.searchFood);
router.get('/:id', handler.getFoodById);
router.put('/:id', handler.updateFood);
router.delete('/:id', handler.deleteFood);
router.post('/bulk', handler.bulkCreateFood)

export default router;