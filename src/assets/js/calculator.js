// calculator.js

// Zamiast stałej BASE_BAKE_TIME, funkcja przyjmuje bazowy czas jako drugi parametr!
export const calculateTotalTime = (layers, currentBaseTime) => {
    const BAKE_TIME_PER_LAYER = 10;
    return currentBaseTime + (layers * BAKE_TIME_PER_LAYER);
};

export const calculateRemainingTime = (total, elapsed) => {
    const remaining = total - elapsed;
    return Math.max(0, remaining); // Świetne użycie Math.max!
};

export const validateBakingData = (layers, elapsed) => {
    const errors = [];
    
    if (layers <= 0 || layers > 5) {
        errors.push("Maksymalna liczba warstw to 5.");
    }
    if (elapsed < 0) {
        errors.push("Czas pieczenia nie może być ujemny.");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

export const getBaseTimeByType = (type) => {
    switch (type) {
        case 'vegan':
            return 8;  
        case 'gluten-free':
            return 5; 
        case 'standard':
        default:
            return 10; 
    }
};