"use client";

import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string; // Classes for the outer <section> (backgrounds, etc)
  containerClassName?: string; // Additional classes for the inner container
}

export function SectionContainer({
  children,
  id,
  className,
  containerClassName,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <div className={cn("layout-container", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
