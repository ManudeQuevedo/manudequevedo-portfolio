export function initConsoleEasterEgg() {
  if (typeof window === "undefined") return;
  // Optional: only run in production or development. Let's run it everywhere so they can see it locally too.

  const asciiArt = `
  __  __  _____   ____  
 |  \\/  ||  __ \\ / __ \\ 
 | \\  / || |  | | |  | |
 | |\\/| || |  | | |  | |
 | |  | || |__| | |__| |
 |_|  |_||_____/ \\___\\_\\
  `;

  const brandStyle = "color: #ff6b00; font-family: monospace; font-size: 10px; line-height: 1.2; font-weight: bold;";
  const whiteStyle = "color: #ffffff; font-family: sans-serif; font-size: 14px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;";
  const grayStyle = "color: #888888; font-family: sans-serif; font-size: 12px; margin-bottom: 10px;";
  const highlightStyle = "color: #ff6b00; font-family: sans-serif; font-size: 12px; font-style: italic; margin-bottom: 15px;";
  const ctaStyle = "color: #ffffff; font-family: sans-serif; font-size: 14px; font-weight: bold; background: #ff6b00; padding: 4px 8px; border-radius: 4px;";

  console.log("%c" + asciiArt, brandStyle);
  console.log("%cHey dev 👋 — encontraste el layer que importa.", whiteStyle);
  console.log("%cBuilt with: Next.js 15 · TypeScript · TailwindCSS v4 · Framer Motion · GSAP · Lenis", grayStyle);
  console.log("%c¿Puedes encontrar la función que genera el efecto de terminal en el hero? Pista: busca initTerminalEffect() en el source.", highlightStyle);
  console.log("%cSi llegaste hasta aquí, probablemente encajes bien. → contact@manudequevedo.com", ctaStyle);
}
