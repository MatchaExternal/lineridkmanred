"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronRight, Palette, ArrowLeft } from "lucide-react"
import { sfx } from "@/lib/sound"
import { communityArt } from "@/lib/data"

type PanelView = "menu" | "community-art"

const PANEL_TABS: { id: PanelView; label: string; code: string; icon: React.ReactNode }[] = [
  { id: "community-art", label: "COMMUNITY ART", code: "A1", icon: <Palette className="h-4 w-4" /> },
]

export function SidePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [view, setView] = useState<PanelView>("menu")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = () => {
    sfx.nav()
    onClose()
    // reset after the exit animation
    setTimeout(() => {
      setView("menu")
      setLightbox(null)
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-border bg-card"
            role="dialog"
            aria-label="Side panel"
          >
            {/* header */}
            <div className="flex h-14 items-center gap-3 border-b border-border px-4">
              {view !== "menu" && (
                <button
                  onClick={() => {
                    sfx.nav()
                    setView("menu")
                    setLightbox(null)
                  }}
                  onMouseEnter={() => sfx.hover()}
                  aria-label="Back to menu"
                  className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <span className="font-mono text-[10px] tracking-widest text-amber">MENU //</span>
              <span className="font-display text-lg tracking-wide text-foreground">
                {view === "menu" ? "MORE" : "COMMUNITY ART"}
              </span>
              <button
                onClick={close}
                onMouseEnter={() => sfx.hover()}
                aria-label="Close panel"
                className="ml-auto border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto">
              {view === "menu" && (
                <div className="flex flex-col p-2">
                  {PANEL_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        sfx.confirm()
                        setView(tab.id)
                      }}
                      onMouseEnter={() => sfx.hover()}
                      className="flex items-center gap-3 border border-transparent px-3 py-3 text-left transition-colors hover:border-border hover:bg-secondary/40"
                    >
                      <span className="text-amber">{tab.icon}</span>
                      <span className="font-mono text-[10px] tracking-widest text-amber">{tab.code}</span>
                      <span className="font-display text-base tracking-wide text-foreground">{tab.label}</span>
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {view === "community-art" && (
                <div className="grid grid-cols-1 gap-3 p-4">
                  {communityArt.map((art, i) => (
                    <button
                      key={art.code}
                      onClick={() => {
                        sfx.confirm()
                        setLightbox(i)
                      }}
                      onMouseEnter={() => sfx.hover()}
                      className="group block overflow-hidden border border-border bg-background text-left transition-colors hover:border-amber"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={art.src || "/placeholder.svg"}
                        alt={`${art.title} by ${art.artist}`}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="flex items-center gap-2 border-t border-border px-3 py-2">
                        <span className="font-mono text-[10px] tracking-widest text-amber">{art.code}</span>
                        <span className="truncate font-display text-sm tracking-wide text-foreground">
                          {art.title}
                        </span>
                        <span className="ml-auto truncate font-mono text-[10px] text-muted-foreground">
                          {art.artist}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>

          {/* lightbox */}
          <AnimatePresence>
            {lightbox !== null && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(null)}
                className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background/95 p-4 backdrop-blur"
              >
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close image"
                  className="absolute right-4 top-4 border border-border p-1.5 text-muted-foreground transition-colors hover:border-amber hover:text-amber"
                >
                  <X className="h-5 w-5" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={communityArt[lightbox].src || "/placeholder.svg"}
                  alt={communityArt[lightbox].title}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[80vh] max-w-full border border-border object-contain"
                />
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-amber">
                    {communityArt[lightbox].code}
                  </span>
                  <span className="font-display text-lg tracking-wide text-foreground">
                    {communityArt[lightbox].title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    // {communityArt[lightbox].artist}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
