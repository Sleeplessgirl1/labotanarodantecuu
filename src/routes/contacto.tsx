import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
  head: () => ({ meta: [{ title: "Contacto — La Botana Rodante" }] }),
});

function ContactoPage() {
  return (
    <div>
      <Header title="Contacto" emoji="📞" subtitle="Estamos listos para tu próximo evento" />
      <div className="px-5 space-y-3 pb-4">
        <a
          href="https://wa.me/526145154240"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-4 rounded-full text-base active:scale-[0.98] transition shadow-soft"
        >
          <MessageCircle className="h-5 w-5" />
          Escribir por WhatsApp
        </a>
        <a
          href="https://instagram.com/labotanaradante"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white border-2 border-primary text-primary font-bold py-4 rounded-full text-base active:scale-[0.98] transition"
        >
          <Instagram className="h-5 w-5" />
          Seguirnos en Instagram
        </a>

        <div className="mt-8 space-y-3">
          <InfoRow icon={MapPin} label="Ubicación" value="Chihuahua, Chih." />
          <InfoRow icon={Clock} label="Horario" value="Lunes a Domingo · Eventos con cita previa" />
          <InfoRow icon={MessageCircle} label="Teléfono" value="+52 614 515 42 40" />
          <InfoRow icon={Instagram} label="Instagram" value="@labotanaradante" />
        </div>

        <p className="text-center text-xs text-muted-foreground font-light pt-8">
          La Botana Rodante · Snack bar para eventos
        </p>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 shadow-soft flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
