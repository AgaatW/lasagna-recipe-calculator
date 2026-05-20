// animations.js

// --- GSAP ANIMATION ---

// Animacja "wskakiwania" wyniku

export function animateResult(element) {
    gsap.from(element, {
        duration: 0.5,
        y: 10,
        opacity: 0,
        scale: 0.8,
        ease: "back.out(1.7)"
    });
}

