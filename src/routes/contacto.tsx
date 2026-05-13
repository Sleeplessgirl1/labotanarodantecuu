import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
  head: () => ({ meta: [{ title: "Contacto — La Botana Rodante" }] }),
});

function ContactoPage() {
  return (
    <div>
      <Header kicker="Hablemos" title="Contacto" />

      <div className="px-6 pb-6 space-y-3">
        <a
          href="https://wa.me/526145154240"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 bg-primary text-primary-foreground rounded-[22px] px-6 py-5 active:scale-[0.99] transition animate-fade-up"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold opacity-80">WhatsApp</p>
            <p className="text-lg font-extrabold mt-1">+52 614 515 42 40</p>
          </div>
          <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <a
          href="https://instagram.com/labotanaradante"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 bg-accent rounded-[22px] px-6 py-5 active:scale-[0.99] transition animate-fade-up delay-1 hover:bg-foreground hover:text-white"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold opacity-70">Instagram</p>
            <p className="text-lg font-extrabold mt-1">@labotanaradante</p>
          </div>
          <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="pt-6 mt-2 border-t border-border space-y-5 animate-fade-up delay-2">
          <Detail label="Ubicación" value="Chihuahua, Chih." />
          <Detail label="Horario" value="Lunes a Domingo · Eventos con cita previa" />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">{label}</p>
      <p className="text-[15px] font-semibold mt-1">{value}</p>
    </div>
  );
}
