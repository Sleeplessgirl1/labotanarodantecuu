import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import foto1 from "@/assets/galeria/la_botana1.jpg.asset.json";
import foto2 from "@/assets/galeria/botana2.jpg.asset.json";
import foto3 from "@/assets/galeria/botana3.jpg.asset.json";
import foto4 from "@/assets/galeria/botana4.jpg.asset.json";
import foto5 from "@/assets/galeria/botana5.jpg.asset.json";
import foto6 from "@/assets/galeria/botana6.jpg.asset.json";

export const Route = createFileRoute("/galeria")({
  component: GaleriaPage,
  head: () => ({ meta: [{ title: "Galería — La Botana Rodante" }] }),
});

const PHOTOS = [
  { src: foto3.url, alt: "Barra de snacks La Botana Rodante con frutas frescas" },
  { src: foto1.url, alt: "Barra de toppings montada en evento al aire libre" },
  { src: foto2.url, alt: "Cantarito de barro escarchado con mariachi de fondo" },
  { src: foto4.url, alt: "Mini hamburguesas con queso fundido y papas francesas" },
  { src: foto5.url, alt: "Mini hamburguesa con queso derretido sobre papas" },
  { src: foto6.url, alt: "Mini hamburguesas con queso y papas en evento" },
];

function GaleriaPage() {
  const [open, setOpen] = useState<number | null>(null);
  const next = () => setOpen((o) => (o === null ? null : (o + 1) % PHOTOS.length));
  const prev = () => setOpen((o) => (o === null ? null : (o - 1 + PHOTOS.length) % PHOTOS.length));

  return (
    <div>
      <Header kicker="Eventos" title="Galería" />
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="aspect-square rounded-3xl overflow-hidden border border-border group transition active:scale-95 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur flex items-center justify-center animate-fade-up" onClick={() => setOpen(null)}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-5 right-5 text-white p-2 z-10" aria-label="cerrar">
            <X className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 text-white p-2 z-10" aria-label="anterior">
            <ChevronLeft className="h-7 w-7" />
          </button>
          <img
            src={PHOTOS[open].src}
            alt={PHOTOS[open].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
          />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 text-white p-2 z-10" aria-label="siguiente">
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
