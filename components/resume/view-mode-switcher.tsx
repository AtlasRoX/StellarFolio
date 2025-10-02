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
import { Eye, Check } from "lucide-react"
import type { ViewMode } from "./resume-view"

interface ViewModeSwitcherProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

const viewModes: { value: ViewMode; label: string; description: string }[] = [
  { value: "normal", label: "Normal View", description: "Standard resume layout" },
  { value: "story", label: "Story Mode", description: "Timeline narrative view" },
  { value: "recruiter", label: "Recruiter Mode", description: "ATS-optimized view" },
  { value: "client", label: "Client Mode", description: "Freelancing portfolio view" },
]

export function ViewModeSwitcher({ viewMode, onViewModeChange }: ViewModeSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="backdrop-blur-sm bg-transparent">
          <Eye className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>View Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {viewModes.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onClick={() => onViewModeChange(mode.value)}
            className="flex items-start gap-2 cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{mode.label}</span>
                {viewMode === mode.value && <Check className="h-4 w-4" />}
              </div>
              <p className="text-xs text-muted-foreground">{mode.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
