import type { AnchorHTMLAttributes } from "react";

// ContactButton is the gradient pill used for the primary call to action.
export function ContactButton({
  label,
  href = "#contact",
  ...rest
}: { label: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      {...rest}
      className="inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-opacity duration-200 hover:opacity-90 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(160deg, #FFFFFF 10%, #D7E2EA 55%, #8A9099 100%)",
        boxShadow:
          "0px 4px 12px rgba(0, 0, 0, 0.5), -4px -4px 12px rgba(12, 12, 12, 0.35) inset",
        outline: "2px solid #0C0C0C",
        outlineOffset: "-3px",
      }}>
      {label}
    </a>
  );
}
