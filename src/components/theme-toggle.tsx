"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ThemeToggle({ variant = "outline", size = "sm", className = "" }: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Button variant={variant} size={size} onClick={toggleTheme} className={className}>
      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}
