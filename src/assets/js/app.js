// app.js

import { calculateTotalTime, calculateRemainingTime, validateBakingData, getBaseTimeByType } from './calculator.js';
import { animateResult } from './animations.js';

const totalTimeInput = document.querySelector("#total-time");
const elapsedTimeInput = document.querySelector("#elapsed-time");
const calculateBtn = document.querySelector("#calculate-btn");
const display = document.querySelector("#remaining-time");
const unitDisplay = document.querySelector("#unit");
const layersInput = document.querySelector("#layers");

calculateBtn.addEventListener("click", () => {

    const selectedType = document.querySelector("#lasagne-type").value;
    const trayDepth = Number(document.querySelector("#tray-depth").value);


    const elapsed = Number(elapsedTimeInput.value);
    const layersNumberInput = Number(layersInput.value);

    // 2. Resetowanie stanów w UI
    display.classList.remove('is-error', 'is-ready');
    display.style.color = "";
    unitDisplay.style.display = "inline";

    const validation = validateBakingData(layersNumberInput, elapsed, trayDepth);

    if (!validation.isValid) {
        display.textContent = validation.errors[0];
        display.classList.add('is-error');
        unitDisplay.style.display = "none";

        animateResult(display);
        return;
    }

    const baseBakeTime = getBaseTimeByType(selectedType);

    // Przekazujemy liczbę warstw do obliczenia czasu całkowitego
    const totalTime = calculateTotalTime(layersNumberInput, baseBakeTime);

    const total = totalTime;

    // Opcjonalnie: aktualizujemy okienko w HTML, żeby użytkownik widział zmianę czasu całkowitego
    totalTimeInput.value = total;


    const remaining = calculateRemainingTime(total, elapsed);


    if (remaining === 0) {
        display.textContent = "Lasagne gotowa!";
        display.classList.add('is-ready');
        unitDisplay.style.display = "none";
    } else {
        display.textContent = remaining;
    }

    animateResult(display);
});