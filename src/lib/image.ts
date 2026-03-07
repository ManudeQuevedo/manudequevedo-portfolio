const svgToDataUrl = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export function getBlurDataUrl({
  background = "#0a0a0a",
  highlight = "#f97316",
}: {
  background?: string;
  highlight?: string;
} = {}) {
  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#111111" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${highlight}" stop-opacity="0.42" />
          <stop offset="100%" stop-color="${highlight}" stop-opacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="42" />
        </filter>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <circle cx="820" cy="320" r="320" fill="url(#glow)" filter="url(#blur)" />
    </svg>
  `);
}
