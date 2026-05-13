import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Package, Image as ImageIcon, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/menu", label: "Menú", icon: UtensilsCrossed },
  { to: "/paquetes", label: "Paquetes", icon: Package },
  { to: "/galeria", label: "Galería", icon: ImageIcon },
  { to: "/carrito", label: "Carrito", icon: ShoppingBag },
] as const;

export function AppShell() {
  const { count } = useCart();
  const loc = useLocation();
  const showCta = count > 0 && loc.pathname !== "/carrito";

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#fafaf7]">
      <div className="w-full max-w-[420px] min-h-screen bg-background relative flex flex-col">
        <main className="flex-1 pb-32">
          <Outlet />
        </main>

        {/* Floating "Ver pedido" CTA above nav */}
        {showCta && (
          <Link
            to="/carrito"
            className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-[388px] bg-primary text-primary-foreground rounded-full pl-5 pr-3 py-3 flex items-center justify-between shadow-[0_10px_30px_-8px_rgba(255,107,0,0.55)] active:scale-[0.98] transition animate-fade-up"
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

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-background border-t border-border z-30">
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
  );
}
