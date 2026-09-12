// app.js

import { calculateTotalTime, calculateRemainingTime, validateBakingData, getBaseTimeByType } from './calculator.js';
import { animateResult } from './animations.js';
import { BAKING_RULES } from './config/bakingRules.js';

// 1. Pobieranie ukrytych pól input (z custom selectów) oraz standardowych pól
const typeInput = document.querySelector('#lasagne-type');
const sizeInput = document.querySelector('#tray-size');
const depthInput = document.querySelector('#tray-depth');
const layersInput = document.querySelector('#layers');
const calculateBtn = document.querySelector('#calculate-btn');

// Elementy dla własnego rozmiaru
const customSizeInputs = document.querySelector('#custom-size-inputs');
const customWidthInput = document.querySelector('#custom-width');
const customLengthInput = document.querySelector('#custom-length');

// Elementy wynikowe
const totalTimeInput = document.querySelector('#total-time');
const elapsedRulesInput = document.querySelector('#elapsed-time');
const remainingTimeSpan = document.querySelector('#remaining-time');

// 2. Obsługa Custom Selectów w DOM
document.addEventListener('DOMContentLoaded', () => {
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const triggerText = select.querySelector('.select-trigger span');
    const options = select.querySelectorAll('.option');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelects.forEach(other => {
        if (other !== select) other.classList.remove('open');
      });
      select.classList.toggle('open');
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        triggerText.textContent = option.textContent;
        if (hiddenInput) {
          hiddenInput.value = option.dataset.value;
          hiddenInput.dispatchEvent(new Event('change'));
        }

        select.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', () => {
    customSelects.forEach(select => select.classList.remove('open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      customSelects.forEach(select => select.classList.remove('open'));
    }
  });
});

// 3. Obsługa pokazywania/ukrywania pól dla własnej blachy
if (sizeInput) {
  sizeInput.addEventListener('change', function() {
    if (sizeInput.value === 'custom') {
      customSizeInputs.style.display = 'block';
    } else {
      customSizeInputs.style.display = 'none';
    }
  });
}

// 4. Główna funkcja przeliczająca (wykorzystuje funkcje z calculator.js!)
function handleCalculation() {
  const type = typeInput ? typeInput.value : 'standard';
  const sizeOption = sizeInput ? sizeInput.value : 'small';
  const depth = depthInput ? depthInput.value : 'standard';
  const layers = parseInt(layersInput.value, 10) || 1;
  const elapsed = parseInt(elapsedRulesInput.value, 10) || 0;

  // Pobranie wysokości w cm z reguł (lub domyślnie 6cm)
  const trayDepthCm = BAKING_RULES.trayDepthsInCm ? BAKING_RULES.trayDepthsInCm[depth] : 6;

  // Użycie funkcji walidującej z calculator.js
  const validation = validateBakingData(layers, elapsed, trayDepthCm);
  if (!validation.isValid) {
    alert(validation.errors.join('\n'));
    return;
  }

  // Użycie funkcji getBaseTimeByType z calculator.js
  const currentBaseTime = getBaseTimeByType(type);

  // Modyfikator rozmiaru blachy
  let sizeModifier = 1.0;
  if (sizeOption === 'custom') {
    const width = parseFloat(customWidthInput.value) || 25;
    const length = parseFloat(customLengthInput.value) || 35;
    const customArea = width * length;
    sizeModifier = customArea / BAKING_RULES.STANDARD_AREA;
    sizeModifier = Math.min(Math.max(sizeModifier, 0.7), 1.4); 
  } else {
    sizeModifier = BAKING_RULES.traySizes[sizeOption] || 1.0;
  }

  // Obliczenie całkowitego czasu (z wykorzystaniem calculateTotalTime z calculator.js)
  const baseCalculatedTime = calculateTotalTime(layers, currentBaseTime);
  const finalTime = Math.round(baseCalculatedTime * sizeModifier);

  // Wpisanie wyniku na ekranie
  totalTimeInput.value = finalTime;
  
  // Obliczenie pozostałego czasu z calculator.js
  updateRemainingTime(finalTime);

  // Odpalenie animacji GSAP!
  if (remainingTimeSpan) {
    animateResult(remainingTimeSpan);
  }
}

// 5. Aktualizacja pozostałego czasu
function updateRemainingTime(forcedTotal = null) {
  const total = forcedTotal !== null ? forcedTotal : (parseInt(totalTimeInput.value, 10) || 0);
  const elapsed = parseInt(elapsedRulesInput.value, 10) || 0;
  
  // Wykorzystujemy funkcję z calculator.js
  const remaining = calculateRemainingTime(total, elapsed);
  remainingTimeSpan.textContent = remaining;
}

// 6. Listener przycisku (Tylko JEDEN!)
calculateBtn.addEventListener('click', handleCalculation);

elapsedRulesInput.addEventListener('input', () => {
  updateRemainingTime();
});

console.log('1. Kontener:', document.querySelector('[data-id="lasagne-type"]'));
console.log('2. Trigger (klik):', document.querySelector('[data-id="lasagne-type"] .select-trigger'));
console.log('3. Input:', document.querySelector('#lasagne-type'));