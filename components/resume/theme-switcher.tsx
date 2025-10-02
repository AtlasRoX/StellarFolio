"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette, Check } from "lucide-react"
import { useTheme } from "@/lib/theme-provider"
import type { Theme } from "./resume-view"

const themes: { value: Theme; label: string; description: string }[] = [
  { value: "minimal", label: "Minimal White Pro", description: "Clean and professional" },
  { value: "dark", label: "Dark Executive", description: "Sophisticated dark mode" },
  { value: "aurora", label: "Aurora Gradient", description: "Colorful and modern" },
  { value: "glass", label: "Glassmorphic Elite", description: "Elegant transparency" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="backdrop-blur-sm bg-transparent">
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-start gap-2 cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t.label}</span>
                {theme === t.value && <Check className="h-4 w-4" />}
              </div>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
