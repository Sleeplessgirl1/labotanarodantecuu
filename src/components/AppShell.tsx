import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Package, Image as ImageIcon, ShoppingBag, ArrowRight, Phone, FileText } from "lucide-react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/menu", label: "Menú", icon: UtensilsCrossed },
  { to: "/paquetes", label: "Paquetes", icon: Package },
  { to: "/galeria", label: "Galería", icon: ImageIcon },
  { to: "/carrito", label: "Carrito", icon: ShoppingBag },
] as const;

const desktopExtra = [
  { to: "/politicas", label: "Políticas", icon: FileText },
  { to: "/contacto", label: "Contacto", icon: Phone },
] as const;

export function AppShell() {
  const { count } = useCart();
  const loc = useLocation();
  const showCta = count > 0 && loc.pathname !== "/carrito";

  return (
    <div className="min-h-screen w-full bg-[#fafaf7]">
      {/* Desktop top nav */}
      <header className="hidden md:block sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="La Botana Rodante" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-xl tracking-wide">LA BOTANA RODANTE</span>
          </Link>
          <nav className="flex items-center gap-1">
            {[...navItems, ...desktopExtra].map(({ to, label }) => {
              const active = loc.pathname === to;
              const isCart = to === "/carrito";
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {label}
                  {isCart && count > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full ring-2 ring-background">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="w-full max-w-[420px] md:max-w-6xl md:px-8 md:py-8 min-h-screen bg-background md:bg-transparent relative flex flex-col">
          <main className="flex-1 pb-32 md:pb-12">
            <div className="md:bg-background md:rounded-3xl md:shadow-sm md:border md:border-border md:overflow-hidden">
              <Outlet />
            </div>
          </main>

          {/* Floating "Ver pedido" CTA — mobile only */}
          {showCta && (
            <Link
              to="/carrito"
              className="md:hidden fixed bottom-[88px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-[388px] bg-primary text-primary-foreground rounded-full pl-5 pr-3 py-3 flex items-center justify-between shadow-[0_10px_30px_-8px_rgba(255,107,0,0.55)] active:scale-[0.98] transition animate-fade-up"
            >
              <span className="flex items-center gap-2.5">
                <span className="bg-white text-primary text-xs font-black h-6 min-w-6 px-2 rounded-full flex items-center justify-center">
                  {count}
                </span>
                <span className="font-bold text-[15px]">Ver mi pedido</span>
              </span>
              <span className="bg-white/15 rounded-full h-9 w-9 flex items-center justify-center">
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          )}

          {/* Bottom nav — mobile only */}
          <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-background border-t border-border z-30">
            <ul className="grid grid-cols-5 px-2 pt-2 pb-3">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = loc.pathname === to;
                const isCart = to === "/carrito";
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex flex-col items-center gap-1 py-1.5 group"
                    >
                      <span className={`relative flex items-center justify-center h-9 w-12 rounded-full transition-all duration-300 ${active ? "bg-primary/12" : ""}`}>
                        <Icon
                          className={`h-[22px] w-[22px] transition-all duration-300 ${
                            active ? "text-primary" : "text-foreground/55 group-active:scale-90"
                          }`}
                          strokeWidth={active ? 2.4 : 1.9}
                        />
                        {isCart && count > 0 && (
                          <span className="absolute -top-0.5 right-1 bg-primary text-primary-foreground text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center animate-pop ring-2 ring-background">
                            {count}
                          </span>
                        )}
                      </span>
                      <span className={`text-[11px] tracking-tight transition-colors ${active ? "text-primary font-bold" : "text-foreground/60 font-semibold"}`}>
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
