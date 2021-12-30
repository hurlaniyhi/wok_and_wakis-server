import { IResponse, ValidationError } from '@src/@types'
import { Response } from 'express'

function sendJson (
    res: Response, 
    data: any, 
    message: string, 
    status: string, 
    statusCode: number,
    isValidationError?: boolean
) {
    data = data || null,
    message = message || ''
    status = status || 'success'
    statusCode = statusCode || 200

    const response = <IResponse>{
        status,
        message
    }

    if (isValidationError) response.errors = data
    else response.data = data

    res.status(statusCode).json(response)
}

function success (res: Response, data: any, message = 'OK', statusCode: number = 200) {
    sendJson(res, data, message, 'success', statusCode)
}

function error (res: Response, data: any, message = 'Internal Server Error', statusCode: number = 500) {
    sendJson(res, data, message, 'error', statusCode)
}

function validationError (res: Response, errors: ValidationError[]|null, statusCode: number = 422) {
    const fallbackError = [
        {
            path: ['system'],
            message: 'Internal Server Error',
        }
    ];
    
    const effectiveErrors = errors || fallbackError;
        
    const formattedErrors = effectiveErrors.map((err) => {
        const rawPath = err.path.join('.');
        const arrayMatch = rawPath.match(/^(\d+)\./);
        const humanIndex = arrayMatch ? Number(arrayMatch[1]) + 1 : null;
    
        const field = humanIndex ? rawPath.split('.')[1] : rawPath;
        const bulkMessage = humanIndex
            ? `${err.message}, please check bulk_data Entry ${humanIndex}`
            : err.message;
    
        return {
            field,
            message: bulkMessage,
        };
    });

    sendJson(res, formattedErrors, 'Validation error', 'error', statusCode, true)
}

export default {
    success,
    error,
    validationError
}