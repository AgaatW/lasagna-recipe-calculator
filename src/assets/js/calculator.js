export const calculateRemainingTime = (total, elapsed) => {
    const remaining = total - elapsed;
    return Math.max(0, remaining);
};