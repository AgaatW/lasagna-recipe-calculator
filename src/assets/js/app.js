import { calculateRemainingTime } from './calculator.js';

const elapsedTimeInput = document.querySelector("#elapsed-time");
const calculateBtn = document.querySelector("#calculate-btn");
const display = document.querySelector("#remaining-time");
const totalTimeInput = document.querySelector("#total-time");

calculateBtn.addEventListener("click", () => {
    const elapsed = Number(elapsedTimeInput.value);
    const total = Number(totalTimeInput.value);

    const remaining = calculateRemainingTime(total, elapsed);
    display.textContent = remaining;
});