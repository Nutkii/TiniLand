import confetti from "canvas-confetti";

export function fireConfetti() {
  const colors = ["#ff7bab", "#a97bff", "#f8bd2e", "#fff9f0"];
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
  });
}

export function fireBigConfetti() {
  const colors = ["#ff7bab", "#a97bff", "#f8bd2e", "#fff9f0", "#ffffff"];
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({ particleCount: 200, spread: 160, origin: { y: 0.5 }, colors, startVelocity: 45 });
}

export function fireFireworks() {
  const colors = ["#ff7bab", "#a97bff", "#f8bd2e", "#fff9f0"];
  const duration = 6000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5,
      },
      colors,
      scalar: 1.2,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
