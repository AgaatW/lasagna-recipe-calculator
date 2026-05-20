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
    // Pobieramy zaznaczony typ (np. 'vegan', 'standard')
    const selectedType = document.querySelector("#lasagne-type").value;

    // 1. Pobieranie wartości z inputów i konwersja na liczby
    const elapsed = Number(elapsedTimeInput.value);
    const layersNumberInput = Number(layersInput.value); 

    // 2. Resetowanie stanów w UI
    display.classList.remove('is-error', 'is-ready');
    display.style.color = ""; 
    unitDisplay.style.display = "inline";

    // 3. Walidacja danych wejściowych (Poprawiona nazwa zmiennej!)
    const validation = validateBakingData(layersNumberInput, elapsed);

    if (!validation.isValid) {
        display.textContent = validation.errors[0]; 
        display.classList.add('is-error');
        unitDisplay.style.display = "none";
        
        animateResult(display); 
        return; // Early return - przerywamy!
    }

    // --- TUTAJ LOGICZNY TUNING: ---
    
    // Pobieramy dynamiczny czas bazowy za pomocą Twojego switcha
    const baseBakeTime = getBaseTimeByType(selectedType)

    // Przekazujemy liczbę warstw do obliczenia czasu całkowitego
    const totalTime = calculateTotalTime(layersNumberInput, baseBakeTime);

    // Ponieważ bazowy czas ma się zmieniać, nadpisujemy zmienną total 
    // Twoim nowym, inteligentnym obliczeniem (totalTime)
    const total = totalTime; 
    
    // Opcjonalnie: aktualizujemy okienko w HTML, żeby użytkownik widział zmianę czasu całkowitego
    totalTimeInput.value = total;

    // 4. Logika obliczeń (remaining bazuje teraz na dynamicznym total)
    const remaining = calculateRemainingTime(total, elapsed);

    // Reakcja na sukces / status gotowości
    if (remaining === 0) {
        display.textContent = "Lasagne gotowa!";
        display.classList.add('is-ready');
        unitDisplay.style.display = "none";
    } else {
        display.textContent = remaining;
    }

    // Odpalenie animacji dla poprawnego wyniku
    animateResult(display);
});