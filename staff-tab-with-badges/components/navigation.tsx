"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Menu, X, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { sfx, setSoundEnabled } from "@/lib/sound"
import { DISCORD_URL } from "@/lib/data"

export type TabId = "home" | "leaderboards" | "arsenal" | "community" | "statistics" | "staff"

const TABS: { id: TabId; label: string; code: string }[] = [
  { id: "home", label: "HOME", code: "00" },
  { id: "leaderboards", label: "LEADERBOARDS", code: "01" },
  { id: "arsenal", label: "ARSENAL", code: "02" },
  { id: "community", label: "COMMUNITY", code: "03" },
  { id: "statistics", label: "STATISTICS", code: "04" },
  { id: "staff", label: "STAFF", code: "05" },
]

export function Navigation({
  active,
  onChange,
  onOpenPanel,
}: {
  active: TabId
  onChange: (t: TabId) => void
  onOpenPanel: () => void
}) {
  const [sound, setSound] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSound = () => {
    const next = !sound
    setSound(next)
    setSoundEnabled(next)
    if (next) sfx.confirm()
  }

  const select = (t: TabId) => {
    sfx.nav()
    onChange(t)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* logo */}
        <button onClick={() => select("home")} className="flex items-center gap-2">
          <span className="font-display text-xl tracking-wider text-foreground">REDLINER</span>
          <span className="hidden text-[10px] tracking-widest text-amber sm:inline">MERC.OS</span>
        </button>

        {/* desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => select(tab.id)}
                onMouseEnter={() => sfx.hover()}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-[9px] text-amber">{tab.code}</span>
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-x-1 -bottom-px h-0.5 bg-amber"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sfx.hover()}
            className="ml-1 border border-border px-3 py-1.5 text-xs tracking-widest text-muted-foreground transition-colors hover:border-amber hover:text-amber"
          >
            DISCORD ↗
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-[10px] text-muted-foreground md:inline">
            <span className="cursor-blink text-amber">●</span> LINK STABLE / 13ms
          </span>
          <button
            onClick={toggleSound}
            aria-label={sound ? "Mute audio" : "Enable audio"}
            className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber"
          >
            {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={() => {
              sfx.nav()
              onOpenPanel()
            }}
            onMouseEnter={() => sfx.hover()}
            aria-label="Open more menu"
            className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              sfx.nav()
              setMobileOpen((o) => !o)
            }}
            aria-label="Toggle menu"
            className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {mobileOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden border-t border-border lg:hidden"
        >
          <div className="flex flex-col p-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => select(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-left text-xs tracking-widest",
                  active === tab.id ? "bg-secondary text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="text-[9px] text-amber">{tab.code}</span>
                {tab.label}
              </button>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 text-xs tracking-widest text-amber"
            >
              DISCORD ↗
            </a>
          </div>
        </motion.nav>
      )}
    </header>
  )
}
