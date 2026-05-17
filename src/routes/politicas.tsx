import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/politicas")({
  component: PoliticasPage,
  head: () => ({ meta: [{ title: "Políticas — La Botana Rodante" }] }),
});

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Pagos",
    body: <p>50% anticipo para confirmar fecha. 50% restante el día del evento antes de iniciar. No se acepta pago posterior al servicio.</p>,
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
        <li><b>Snacks:</b> 2 porciones incluidas por persona, refill hasta agotar stock. Personal avisa al llegar al 20% del stock.</li>
        <li><b>Bebidas:</b> básico 1/pax, estándar 2/pax, premium hasta agotar stock. Copa adicional: $90. Hora extra: +$800.</li>
        <li><b>Burgers:</b> una ronda incluida. Rondas extra con mínimo 48 hrs de anticipación.</li>
        <li>Personas adicionales pagan precio de lista en sitio.</li>
      </ul>
    ),
  },
  {
    title: "Alcohol",
    body: <p>No se sirve a menores de 18 años. Personal puede solicitar identificación. Informar al contratar si se requiere versión sin alcohol. Personal puede suspender el servicio a personas en estado visible de ebriedad. Clamato con carne seca siempre se cotiza aparte.</p>,
  },
  {
    title: "Logística",
    body: (
      <ul className="space-y-2 list-disc pl-5">
        <li>Espacio mínimo: 3×2 m por barra con acceso a corriente eléctrica.</li>
        <li>Montaje: 90 minutos antes del inicio del evento.</li>
        <li>Servicio en Chihuahua ciudad sin cargo extra. Eventos foráneos con cotización especial.</li>
        <li>Alergias: informar al contratar.</li>
        <li>Alimentos no consumidos se pueden entregar al finalizar el evento.</li>
      </ul>
    ),
  },
];

function PoliticasPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <Header kicker="Información" title="Políticas" />
      <div className="px-6 pb-6">
        <ul className="divide-y divide-border border-y border-border">
          {SECTIONS.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 py-5 text-left group"
                >
                  <span className={`text-base font-extrabold transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                    {s.title}
                  </span>
                  <span className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-primary border-primary text-primary-foreground rotate-45" : "border-border text-muted-foreground"
                  }`}>
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 text-[15px] leading-relaxed text-foreground/80">{s.body}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
