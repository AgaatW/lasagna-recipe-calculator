// calculator.js

export const calculateTotalTime = (layers, currentBaseTime) => {
    const BAKE_TIME_PER_LAYER = 10;
    return currentBaseTime + (layers * BAKE_TIME_PER_LAYER);
};

export const validateBakingData = (layers, elapsed, trayDepth) => {
    const errors = [];
    const LAYER_THICKNESS = 1.2; 

    const maxLayers = Math.floor(trayDepth / LAYER_THICKNESS);


    if (layers <= 0 || layers > maxLayers) {
        errors.push(`Dla tej blachy maksymalna liczba warstw to ${maxLayers}.`);
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

export const calculateRemainingTime = (total, elapsed) => {
    const remaining = total - elapsed;
    return Math.max(0, remaining);
};