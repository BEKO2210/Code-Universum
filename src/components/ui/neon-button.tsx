"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type NeonVariant = "cyan" | "purple" | "pink" | "green";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: NeonVariant;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<NeonVariant, string> = {
  cyan: "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] hover:shadow-[var(--cu-glow-cyan)] hover:bg-[rgba(0,240,255,0.08)]",
  purple:
    "border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] hover:shadow-[var(--cu-glow-purple)] hover:bg-[rgba(168,85,247,0.08)]",
  pink: "border-[var(--cu-neon-pink)] text-[var(--cu-neon-pink)] hover:shadow-[var(--cu-glow-pink)] hover:bg-[rgba(236,72,153,0.08)]",
  green:
    "border-[var(--cu-neon-green)] text-[var(--cu-neon-green)] hover:shadow-[0_0_20px_rgba(34,255,136,0.3)] hover:bg-[rgba(34,255,136,0.08)]",
};

const sizeStyles = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-sm rounded-xl",
  lg: "h-14 px-8 text-base rounded-2xl",
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ variant = "cyan", size = "md", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center gap-2 border font-medium transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";
