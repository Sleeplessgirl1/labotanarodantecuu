import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, UtensilsCrossed, Package, Image as ImageIcon, FileText, Phone, MessageCircle, Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "La Botana Rodante — Snack bar para tu evento" }] }),
});

const WA = "https://wa.me/5216145154240?text=" + encodeURIComponent("Hola! Quiero cotizar un evento con La Botana Rodante.");

function Home() {
  return (
    <div className="px-6 pt-7 pb-6">
      {/* Brand row */}
      <div className="flex items-center justify-between animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-foreground text-white flex items-center justify-center font-black text-lg tracking-tighter">
            LB
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Snack Bar Móvil</p>
            <h1 className="text-[17px] font-extrabold leading-tight tracking-tight">La Botana Rodante</h1>
          </div>
        </div>
        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          className="h-10 w-10 rounded-full bg-accent flex items-center justify-center active:scale-90 transition"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
        </a>
      </div>

      {/* Hero */}
      <div className="mt-7 animate-fade-up delay-1">
        <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-primary">Chihuahua · Eventos</p>
        <h2 className="font-display mt-3 text-[3.4rem]">
          Botanas, bebidas <br/>y mini burgers <span className="text-primary">a tu fiesta.</span>
        </h2>
        <p className="mt-3 text-[15px] text-foreground/70 leading-snug">
          Arma tu pedido en segundos. Te cotizamos por WhatsApp.
        </p>
      </div>

      {/* Primary CTAs */}
      <div className="mt-6 grid grid-cols-5 gap-2.5 animate-fade-up delay-2">
        <Link
          to="/menu"
          className="col-span-3 relative overflow-hidden bg-primary text-primary-foreground rounded-[22px] p-5 active:scale-[0.98] transition"
        >
          <div className="absolute -right-8 -bottom-10 h-32 w-32 rounded-full bg-white/10 animate-orbit" />
          <p className="relative text-[10px] uppercase tracking-[0.2em] font-bold opacity-90">Empieza aquí</p>
          <p className="relative mt-1.5 text-[20px] leading-[1.05] font-black">Armar mi pedido</p>
          <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-bold opacity-95">
            Ver menú <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
        <Link
          to="/paquetes"
          className="col-span-2 bg-foreground text-white rounded-[22px] p-5 active:scale-[0.98] transition flex flex-col justify-between"
        >
          <Flame className="h-5 w-5" strokeWidth={2} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">Combos</p>
            <p className="text-[18px] leading-[1.05] font-black mt-1">Paquetes</p>
          </div>
        </Link>
      </div>

      {/* Featured: Mini Burgers */}
      <Link
        to="/paquetes"
        className="mt-3 block rounded-[22px] border-2 border-primary/25 bg-primary/5 p-5 active:scale-[0.99] transition animate-fade-up delay-3"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Nuevo</p>
            <p className="font-black text-[17px] leading-tight mt-1">Mini Burgers + Papas</p>
            <p className="text-[12.5px] text-foreground/65 mt-1">Desde $2,850 · 30 personas</p>
          </div>
          <span className="bg-primary text-primary-foreground font-bold text-xs px-4 py-2.5 rounded-full whitespace-nowrap">
            Ver
          </span>
        </div>
      </Link>

      {/* Section list */}
      <div className="mt-7 space-y-2 animate-fade-up delay-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 px-1">Explorar</p>
        <NavRow to="/menu" icon={UtensilsCrossed} title="Menú completo" subtitle="Snacks · Frutas · Bebidas" />
        <NavRow to="/galeria" icon={ImageIcon} title="Galería" subtitle="Eventos pasados" />
        <NavRow to="/politicas" icon={FileText} title="Políticas" subtitle="Pago, refill, logística" />
        <NavRow to="/contacto" icon={Phone} title="Contacto" subtitle="WhatsApp · Instagram" />
      </div>

      {/* Final CTA */}
      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-center gap-2 w-full bg-foreground text-white font-bold py-4 rounded-full text-[15px] active:scale-[0.99] transition animate-fade-up delay-5"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
        Hablar directo por WhatsApp
      </a>

      <p className="mt-5 text-center text-[11px] text-muted-foreground tracking-wide">
        Chihuahua, Chih. · +52 614 515 42 40
      </p>
    </div>
  );
}

function NavRow({
  to, icon: Icon, title, subtitle,
}: {
  to: string; icon: typeof UtensilsCrossed; title: string; subtitle: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-[18px] px-4 py-3.5 bg-accent/60 hover:bg-accent transition active:scale-[0.99]"
    >
      <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center shrink-0 transition group-hover:text-primary">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[14.5px] leading-tight">{title}</p>
        <p className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
