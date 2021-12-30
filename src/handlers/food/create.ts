import { Request, Response, NextFunction } from 'express';
import * as FoodModel from '../../models';
import { foodSchema } from '../../validators';
import response from '../../utils/response';

export const createFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = foodSchema.parse(req.body);
        const result = await FoodModel.createFood(parsed);

        return response.success(res, result, 'Food created', 201);
    } 
    catch (err: any) {
        next(err);
    }
};