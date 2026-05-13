import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/politicas")({
  component: PoliticasPage,
  head: () => ({ meta: [{ title: "Políticas — La Botana Rodante" }] }),
});

const SECTIONS = [
  {
    title: "Pagos",
    body: (
      <p>50% anticipo para confirmar fecha. 50% restante el día del evento antes de iniciar. No se acepta pago posterior al servicio.</p>
    ),
  },
  {
    title: "Cancelaciones",
    body: (
      <ul className="space-y-2 list-disc pl-5">
        <li>Más de 15 días antes: reembolso total o reagenda sin costo.</li>
        <li>8 a 14 días antes: se retiene 50% del anticipo.</li>
        <li>Menos de 7 días: anticipo no reembolsable.</li>
        <li>Cambios en número de personas aceptados hasta 5 días antes del evento.</li>
      </ul>
    ),
  },
  {
    title: "Refill y porciones",
    body: (
      <ul className="space-y-2 list-disc pl-5">
        <li><b>Snacks:</b> 2 porciones incluidas por persona, refill hasta agotar stock, sin reposición gratuita extra. Personal avisa al llegar al 20% del stock.</li>
        <li><b>Bebidas:</b> básico 1 bebida/pax, estándar 2 bebidas/pax, premium hasta agotar stock. Copa adicional fuera de paquete: $90. Hora extra de servicio: +$800.</li>
        <li><b>Burgers:</b> una ronda incluida. Rondas extra con mínimo 48 hrs de anticipación.</li>
        <li>Personas adicionales al contrato pagan precio de lista en sitio.</li>
      </ul>
    ),
  },
  {
    title: "Alcohol",
    body: (
      <p>No se sirve a menores de 18 años. Personal puede solicitar identificación. Informar al contratar si se requiere versión sin alcohol. Personal puede suspender el servicio a personas en estado visible de ebriedad. Clamato con carne seca siempre se cotiza aparte.</p>
    ),
  },
  {
    title: "Logística",
    body: (
      <ul className="space-y-2 list-disc pl-5">
        <li>Espacio mínimo requerido: 3×2 m por barra con acceso a corriente eléctrica.</li>
        <li>Montaje: 90 minutos antes del inicio del evento.</li>
        <li>Servicio en Chihuahua ciudad sin cargo extra. Eventos foráneos con cotización especial.</li>
        <li>Alergias: informar al contratar.</li>
        <li>Alimentos no consumidos no se entregan al finalizar el evento.</li>
      </ul>
    ),
  },
];

function PoliticasPage() {
  const [open, setOpen] = useState<number | null>(0);
  const ICONS = ["💳", "↩️", "🥤", "🍷", "📦"];
  return (
    <div>
      <Header title="Políticas" emoji="📋" subtitle="Lo que necesitas saber antes de contratar" />
      <div className="px-5 space-y-3 pb-4">
        {SECTIONS.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.title} className={`bg-white border-2 rounded-3xl shadow-soft overflow-hidden transition ${isOpen ? "border-primary" : "border-border"}`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-5 py-4 min-h-[64px] text-left"
              >
                <span className={`h-10 w-10 rounded-2xl flex items-center justify-center text-xl shrink-0 ${isOpen ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
                  {ICONS[i]}
                </span>
                <span className={`flex-1 text-base font-extrabold ${isOpen ? "text-primary" : "text-foreground"}`}>{s.title}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-[15px] font-normal leading-relaxed text-foreground/80 animate-pop">
                  {s.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
