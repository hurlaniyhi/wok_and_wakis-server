import { Request, Response, NextFunction } from 'express';
import * as FoodModel from '../../models';
import response from '../../utils/response';
import { idParamSchema } from '../../validators';

export const getAllFoods = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await FoodModel.getAllFoods();
        return response.success(res, foods, 'Foods fetched');
    } 
    catch (err: any) {
        next(err);
    }
};

export const getFoodById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const food = await FoodModel.getFoodById(id);

        if (!food) {
            return response.error(res, null, 'Food not found', 404);
        }

        return response.success(res, food, 'Food fetched');
    } 
    catch (err: any) {
        next(err);
    }
};