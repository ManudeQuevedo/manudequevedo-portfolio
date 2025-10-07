"use client";
import { useRef, useEffect } from "react";

// Widget mínimo de hCaptcha (sin librería externa)
export default function HCaptcha({ error }: { error?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carga el script una vez
    if (document.querySelector('script[src*="hcaptcha.com/1/api.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://hcaptcha.com/1/api.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="h-captcha"
        data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
      {/* hCaptcha colocará el input hidden `h-captcha-response` dentro del form */}
    </div>
  );
}
