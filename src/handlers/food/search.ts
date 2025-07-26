import { Request, Response, NextFunction } from "express";
import * as FoodModel from '../../models';
import response from '../../utils/response';
import { searchSchema } from '../../validators';

export const searchFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchParam, searchValue } = searchSchema.parse(req.query);
        const foods = await FoodModel.searchFood(searchParam, searchValue);
        return response.success(res, foods, 'Foods fetched');
    } 
    catch (err: any) {
        next(err);
    }
};