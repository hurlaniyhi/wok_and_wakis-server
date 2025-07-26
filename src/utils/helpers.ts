import { Food, ValidationError } from "../@types";
import { allowedCategories } from '../utils/constants'

const getZodErrorStatusCode = (err: ValidationError[]|null): 400 | 422 => {
    // 🔍 Determine if it's a structural (400) or semantic (422) error
    return err?.some(
        (e: any) => e.code === 'invalid_type' || e.code === 'invalid_union'
    ) ? 400 : 422
};

function normalizeCategory(input: string): string {
    const cleanedInput = input.trim().toLowerCase();
  
    const match = allowedCategories.find((cat) => 
        cat.toLowerCase() === cleanedInput
    );
  
    return match || input;
}

function normalizeFood(foodItem: Food) {
    return {
        ...foodItem,
        isPopular: foodItem.isPopular === 1
    };
}

function normalizeSearchValue(value: string) {
    return value === 'true' ? '1' : value === 'false' ? '0' : value
}

export default {
    getZodErrorStatusCode,
    normalizeCategory,
    normalizeFood,
    normalizeSearchValue
}