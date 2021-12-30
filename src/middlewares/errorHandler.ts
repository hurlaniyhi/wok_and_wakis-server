import { Request, Response, NextFunction } from 'express';
import response from '../utils/response'; 
import helpers from '../utils/helpers';
import { ZodError } from 'zod';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        let errors;
        try {
            errors = JSON.parse(`${err.message}`)
        } catch (err) {}

        const statusCode = helpers.getZodErrorStatusCode(errors);

        return response.validationError(res, errors, statusCode);
    }

    return response.error(res, null, err.message || 'Internal Server Error', 500);
};