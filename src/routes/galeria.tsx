import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <div>
      <Header kicker="Eventos" title="Galería" />
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              className="aspect-square rounded-3xl overflow-hidden border border-border group transition animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
