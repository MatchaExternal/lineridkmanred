"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Trophy, Users, Award, Gamepad2, ExternalLink } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { RobloxAvatar, useRoblox } from "@/components/roblox-avatar"
import { sfx } from "@/lib/sound"
import { achievements, gameModes, tournamentWinners } from "@/lib/data"

const FEATURED = ["deprivationist", "KaVoyJin", "Expert_Zerby", "Kyle1517"]

function TerminalPanel({
  icon,
  code,
  title,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode
  code: string
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-border bg-card">
      <button
        onClick={() => {
          sfx.nav()
          setOpen((o) => !o)
        }}
        onMouseEnter={() => sfx.hover()}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
      >
        <span className="text-amber">{icon}</span>
        <span className="font-mono text-[10px] tracking-widest text-amber">{code}</span>
        <span className="font-display text-lg tracking-wide text-foreground">{title}</span>
        <ChevronRight
          className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FeaturedPlayer({ username }: { username: string }) {
  const { data } = useRoblox(username)
  return (
    <div className="flex items-center gap-3 border border-border bg-background p-3">
      <RobloxAvatar username={username} size={48} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-sm text-foreground">{username}</div>
        <div className="font-mono text-[10px] tracking-widest text-muted-foreground">FEATURED OPERATOR</div>
      </div>
      <a
        href={data?.profileUrl ?? `https://www.roblox.com/search/users?keyword=${encodeURIComponent(username)}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => sfx.hover()}
        aria-label={`View ${username} profile`}
        className="text-muted-foreground transition-colors hover:text-amber"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}

export function Community() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        code="03"
        title="COMMUNITY"
        subtitle="Featured operators, declassified achievements, tournament records, and active deployment modes. Expand any module to access its records."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <TerminalPanel icon={<Users className="h-4 w-4" />} code="USR" title="FEATURED OPERATORS" defaultOpen>
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURED.map((u) => (
              <FeaturedPlayer key={u} username={u} />
            ))}
          </div>
        </TerminalPanel>

        <TerminalPanel icon={<Gamepad2 className="h-4 w-4" />} code="MOD" title="DEPLOYMENT MODES" defaultOpen>
          <div className="grid gap-3 sm:grid-cols-2">
            {gameModes.map((m) => (
              <div
                key={m.name}
                className={`border bg-background p-3 ${m.spotlight ? "border-amber/60" : "border-border"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-foreground">{m.name}</span>
                  {m.spotlight && (
                    <span className="border border-amber/60 px-1.5 py-0.5 font-mono text-[8px] tracking-widest text-amber">
                      SPOTLIGHT
                    </span>
                  )}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  {m.category} // {m.players}
                </div>
                <p className="mt-1 font-mono text-xs text-foreground/70">{m.description}</p>
              </div>
            ))}
          </div>
        </TerminalPanel>

        <TerminalPanel icon={<Award className="h-4 w-4" />} code="ACH" title="ACHIEVEMENTS">
          <ul className="divide-y divide-border/60">
            {achievements.map((a) => (
              <li key={a.code} className="flex items-center gap-3 py-2.5">
                <span className="font-mono text-[10px] tracking-widest text-amber">{a.code}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm text-foreground">{a.name}</div>
                  <div className="truncate font-mono text-[11px] text-muted-foreground">{a.desc}</div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{a.unlocked}</span>
              </li>
            ))}
          </ul>
        </TerminalPanel>

        <TerminalPanel icon={<Trophy className="h-4 w-4" />} code="TRN" title="TOURNAMENT WINNERS">
          <ul className="divide-y divide-border/60">
            {tournamentWinners.map((t) => (
              <li key={t.season} className="flex items-center gap-3 py-2.5 font-mono">
                <span className="text-[10px] tracking-widest text-amber">{t.season}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-foreground">{t.event}</div>
                  <div className="truncate text-[11px] text-muted-foreground">WINNER // {t.winner}</div>
                </div>
                <span className="text-xs text-amber">{t.prize}</span>
              </li>
            ))}
          </ul>
        </TerminalPanel>
      </div>
    </section>
  )
}
