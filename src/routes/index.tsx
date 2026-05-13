import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "La Botana Rodante — Inicio" }] }),
});

function Home() {
  return (
    <div className="px-6 pt-10 pb-8 flex flex-col items-center text-center min-h-[calc(100vh-7rem)] relative overflow-hidden">
      {/* Logo placeholder */}
      <div className="h-24 w-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/40 flex items-center justify-center text-primary text-xs font-medium mt-4">
        LOGO
      </div>

      <h1 className="mt-8 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight">
        La Botana<br/>Rodante
      </h1>
      <div className="mt-4 h-[3px] w-16 bg-primary rounded-full" />
      <p className="mt-5 text-base text-muted-foreground font-light max-w-[280px]">
        Snacks, botanas y bebidas para tus eventos
      </p>

      <div className="mt-10 w-full flex flex-col gap-3">
        <Link
          to="/menu"
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-full text-base active:scale-[0.98] transition shadow-soft"
        >
          Ver Menú
        </Link>
        <Link
          to="/paquetes"
          className="w-full bg-white border-2 border-primary text-primary font-bold py-4 rounded-full text-base active:scale-[0.98] transition"
        >
          Ver Paquetes
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-2 text-[11px] font-medium text-muted-foreground w-full">
        <div className="bg-accent rounded-2xl py-3">🌮 Snacks</div>
        <div className="bg-accent rounded-2xl py-3">🍹 Bebidas</div>
        <div className="bg-accent rounded-2xl py-3">🍔 Burgers</div>
      </div>

      {/* Decorative wave */}
      <svg className="absolute bottom-0 left-0 right-0 w-full text-primary" viewBox="0 0 420 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0,40 C80,80 160,0 210,30 C260,60 340,10 420,40 L420,80 L0,80 Z" fill="currentColor" opacity="0.12" />
        <path d="M0,55 C80,90 160,20 210,45 C260,70 340,30 420,55 L420,80 L0,80 Z" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  );
}
