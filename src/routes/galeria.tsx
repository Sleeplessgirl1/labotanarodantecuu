import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/galeria")({
  component: GaleriaPage,
  head: () => ({ meta: [{ title: "Galería — La Botana Rodante" }] }),
});

const SLOTS = Array.from({ length: 8 });

function GaleriaPage() {
  const [open, setOpen] = useState<number | null>(null);
  const next = () => setOpen((o) => (o === null ? null : (o + 1) % SLOTS.length));
  const prev = () => setOpen((o) => (o === null ? null : (o - 1 + SLOTS.length) % SLOTS.length));

  return (
    <div>
      <Header kicker="Eventos" title="Galería" />
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {SLOTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="aspect-square rounded-3xl bg-muted border border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition active:scale-95 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Camera className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-[11px] font-medium">Foto {i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur flex items-center justify-center animate-fade-up" onClick={() => setOpen(null)}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-5 right-5 text-white p-2" aria-label="cerrar">
            <X className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 text-white p-2" aria-label="anterior">
            <ChevronLeft className="h-7 w-7" />
          </button>
          <div className="text-white/50 flex flex-col items-center gap-3">
            <Camera className="h-14 w-14" strokeWidth={1} />
            <p className="text-sm">Foto del evento {open + 1}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 text-white p-2" aria-label="siguiente">
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
