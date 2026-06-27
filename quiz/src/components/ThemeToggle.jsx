"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}