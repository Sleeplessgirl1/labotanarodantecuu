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
      <Header title="Nuestros Eventos" subtitle="Momentos que hemos endulzado" />
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {SLOTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="aspect-square rounded-2xl bg-accent border border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary transition"
            >
              <Camera className="h-7 w-7" strokeWidth={1.5} />
              <span className="text-[11px] font-medium">Foto del evento</span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setOpen(null)}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-5 right-5 text-white p-2" aria-label="cerrar">
            <X className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 text-white p-2" aria-label="anterior">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div className="text-white/60 flex flex-col items-center gap-3">
            <Camera className="h-16 w-16" strokeWidth={1} />
            <p className="text-sm">Foto del evento {open + 1}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 text-white p-2" aria-label="siguiente">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
}
