import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "La Botana Rodante — Inicio" }] }),
});

function Home() {
  return (
    <div className="relative">
      {/* Hero block — solid orange */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-20 rounded-b-[40px] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute top-20 -left-12 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute bottom-4 right-6 text-5xl animate-float">🍹</div>
        <div className="absolute top-10 right-10 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>🌶️</div>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            Snack bar para eventos
          </div>

          <h1 className="mt-5 text-[3.2rem] leading-[0.95] font-black tracking-tight">
            La Botana<br/>Rodante
          </h1>

          <p className="mt-5 text-base text-white/90 max-w-[260px] leading-relaxed">
            Snacks, botanas y bebidas que mueven tu fiesta 🎉
          </p>
        </div>
      </div>

      {/* CTAs floating over hero */}
      <div className="px-5 -mt-12 relative z-10 flex flex-col gap-3">
        <Link
          to="/menu"
          className="group bg-white border-2 border-primary text-primary font-extrabold py-5 rounded-3xl text-lg active:scale-[0.98] transition shadow-soft flex items-center justify-between px-6"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">🌮</span> Ver Menú
          </span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
        </Link>
        <Link
          to="/paquetes"
          className="group bg-foreground text-white font-extrabold py-5 rounded-3xl text-lg active:scale-[0.98] transition shadow-soft flex items-center justify-between px-6"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">🎁</span> Ver Paquetes
          </span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
        </Link>
      </div>

      {/* Quick categories */}
      <div className="px-5 mt-8">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Lo más pedido</p>
        <div className="grid grid-cols-2 gap-3">
          <QuickCard emoji="🍹" title="Cantaritos" sub="40 piezas" />
          <QuickCard emoji="🍅" title="Clamatos" sub="Desde $70" />
          <QuickCard emoji="🍔" title="Burgers" sub="Mini hamburguesas" />
          <QuickCard emoji="🍭" title="Snack Bar" sub="2 porciones/pax" />
        </div>
      </div>

      <div className="px-5 mt-8">
        <Link to="/contacto" className="block bg-accent border border-primary/20 rounded-3xl p-5 text-center">
          <p className="text-2xl">📲</p>
          <p className="mt-1 font-bold">¿Listo para tu evento?</p>
          <p className="text-sm text-muted-foreground">Escríbenos por WhatsApp · 614 515 42 40</p>
        </Link>
      </div>
    </div>
  );
}

function QuickCard({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-soft border border-border">
      <div className="text-3xl">{emoji}</div>
      <p className="mt-2 font-bold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
