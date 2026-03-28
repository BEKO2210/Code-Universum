"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glow?: "cyan" | "purple" | "pink" | "none";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ hover = true, glow = "none", className = "", children, ...props }, ref) => {
    const glowStyles = {
      cyan: "hover:neon-border-cyan",
      purple: "hover:neon-border-purple",
      pink: "hover:border-[var(--cu-neon-pink)] hover:shadow-[var(--cu-glow-pink)]",
      none: "hover:border-[var(--cu-border-hover)]",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`glass ${hover ? "cursor-pointer" : ""} ${glowStyles[glow]} transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
