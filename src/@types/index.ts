export interface Food {
    id?: number;
    title: string;
    description?: string;
    category: string;
    price: number;
    isPopular?: boolean|number;
    imageUrl: string;
}

export interface IResponse {
    status: 'success' | 'error',
    message: string|null,
    data?: any,
    errors?: { field: string; message: string }[] | null
}

export type ValidationError = {
    path: (string | number)[],
    message: any
}