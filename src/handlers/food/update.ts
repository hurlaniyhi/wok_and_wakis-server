import { Request, Response, NextFunction } from 'express';
import * as FoodModel from '../../models';
import { idParamSchema, updateFoodSchema } from '../../validators';
import response from '../../utils/response';

export const updateFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const data = updateFoodSchema.parse(req.body);

        const existing = await FoodModel.getFoodById(id);
        if (!existing) {
            return response.error(res, null, 'Food not found', 404);
        }

        const updated = { ...existing, ...data };
        const result = await FoodModel.updateFood(id, updated);

        return response.success(res, result, 'Food updated');
    } 
    catch (err: any) {
        next(err);
    }
};