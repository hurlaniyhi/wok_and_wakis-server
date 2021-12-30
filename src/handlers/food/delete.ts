import { Request, Response, NextFunction } from 'express';
import * as FoodModel from '../../models';
import { idParamSchema } from '../../validators';
import response from '../../utils/response';

export const deleteFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const changes = await FoodModel.deleteFood(id);
        
        if (changes === 0) {
            return response.error(res, null, 'Food not found', 404);
        }

        return response.success(res, null, 'Food deleted');
    } 
    catch (err: any) {
        next(err);
    }
};
