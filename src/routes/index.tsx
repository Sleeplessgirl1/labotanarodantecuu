import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, UtensilsCrossed, Package, Image as ImageIcon, FileText, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "La Botana Rodante — Inicio" }] }),
});

function Home() {
  return (
    <div className="px-6 pt-8 pb-6">
      {/* Brand row */}
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center font-black text-lg tracking-tighter">
          LB
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Snack Bar</p>
          <h1 className="text-xl font-extrabold leading-tight tracking-tight">La Botana Rodante</h1>
        </div>
      </div>

      {/* Hero CTA card */}
      <Link
        to="/menu"
        className="block mt-6 relative overflow-hidden bg-primary text-primary-foreground rounded-[28px] p-7 active:scale-[0.99] transition animate-fade-up delay-1"
      >
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 animate-orbit" />
        <div className="absolute -right-20 top-6 h-32 w-32 rounded-full bg-white/10 animate-orbit" style={{ animationDelay: "1.5s" }} />

        <p className="relative text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">Cotiza tu evento</p>
        <h2 className="relative mt-3 text-[1.65rem] leading-[1.05] font-extrabold tracking-tight max-w-[260px]">
          Arma tu pedido y mándalo por WhatsApp
        </h2>
        <span className="relative mt-6 inline-flex items-center gap-2 bg-white text-foreground font-bold pl-5 pr-4 py-3 rounded-full text-sm">
          Empezar pedido
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </Link>

      {/* Section list */}
      <div className="mt-5 space-y-2.5">
        <NavCard to="/menu" icon={UtensilsCrossed} title="Menú" subtitle="Snacks, bebidas y más" delay="delay-2" />
        <NavCard to="/paquetes" icon={Package} title="Paquetes" subtitle="Para tu evento" delay="delay-3" />
        <NavCard to="/galeria" icon={ImageIcon} title="Galería" subtitle="Conócenos en fotos" delay="delay-4" />
        <NavCard to="/politicas" icon={FileText} title="Políticas" subtitle="Pagos, refill, logística" delay="delay-5" muted />
        <NavCard to="/contacto" icon={Phone} title="Contacto" subtitle="WhatsApp · Instagram" delay="delay-5" muted />
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground tracking-wide">
        Chihuahua, Chih. · +52 614 515 42 40
      </p>
    </div>
  );
}

function NavCard({
  to, icon: Icon, title, subtitle, delay, muted,
}: {
  to: string; icon: typeof UtensilsCrossed; title: string; subtitle: string; delay?: string; muted?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 rounded-[22px] px-5 py-4 transition active:scale-[0.99] animate-fade-up ${delay} ${
        muted ? "bg-muted hover:bg-accent" : "bg-accent hover:bg-primary/10"
      }`}
    >
      <div className="h-11 w-11 rounded-2xl bg-background border border-border flex items-center justify-center shrink-0 transition group-hover:border-primary group-hover:text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-[15px] leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
