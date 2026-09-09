// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Wait until client hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder or non-theme-dependent markup during SSR
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        style={{ width: 80, height: 36, opacity: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}