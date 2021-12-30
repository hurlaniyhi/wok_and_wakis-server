import { Request, Response, NextFunction } from 'express';
import { bulkFoodSchema } from '../../validators';
import * as FoodModel from '../../models';
import response from '../../utils/response';


export const bulkCreateFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedFoods = bulkFoodSchema.parse(req.body);
        const results = await FoodModel.bulkCreateFoods(parsedFoods);

        return response.success(res, results, 'Foods created', 201);
    } 
    catch (err: any) {
        next(err);
    }
};