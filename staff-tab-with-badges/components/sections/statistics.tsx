"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { ProfileLookup } from "@/components/profile-lookup"
import { DataStream } from "@/components/decor/data-stream"
import { seasonStats } from "@/lib/data"

const DISTRIBUTION = [
  { label: "RECRUIT (1-19)", pct: 44 },
  { label: "OPERATIVE (20-39)", pct: 31 },
  { label: "PROFESSIONAL (40-49)", pct: 14 },
  { label: "ELITE (50-79)", pct: 8 },
  { label: "VETERAN (80+)", pct: 3 },
]

const MODE_SPLIT = [
  { label: "1V1 DUELS", pct: 38 },
  { label: "2V2 WINGMAN", pct: 22 },
  { label: "BATTLEGROUNDS", pct: 33 },
  { label: "TUTORIAL", pct: 7 },
]

function BarList({ title, data }: { title: string; data: { label: string; pct: number }[] }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-4 space-y-3">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="flex justify-between font-mono text-[11px] tracking-widest">
              <span className="text-foreground/90">{d.label}</span>
              <span className="text-amber">{d.pct}%</span>
            </div>
            <div className="mt-1 h-2 w-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="h-full bg-foreground"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Statistics() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        code="04"
        title="STATISTICS"
        subtitle="Season telemetry and operator lookup. Query any Roblox callsign to retrieve its MERC.OS dossier directly from the network."
      />

      {/* profile lookup */}
      <div className="mb-12">
        <div className="mb-3 font-mono text-[10px] tracking-widest text-amber">{"// OPERATOR LOOKUP"}</div>
        <ProfileLookup />
      </div>

      {/* season stats */}
      <div className="mb-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {seasonStats.map((s) => (
          <div key={s.label} className="bg-card p-4">
            <div className="font-display text-3xl text-foreground">{s.value}</div>
            <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarList title="OPERATOR RANK DISTRIBUTION" data={DISTRIBUTION} />
        <BarList title="DEPLOYMENT MODE SPLIT" data={MODE_SPLIT} />
      </div>

      <div className="relative mt-6 h-32 overflow-hidden border border-border bg-card">
        <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-card to-transparent px-4 py-2 font-mono text-[10px] tracking-widest text-muted-foreground">
          LIVE NETWORK FEED
        </div>
        <DataStream className="px-4 py-8" lines={12} />
      </div>
    </section>
  )
}
