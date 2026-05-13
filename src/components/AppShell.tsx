import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Package, ShoppingCart, Image as ImageIcon, FileText, Phone } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/menu", label: "Menú", icon: UtensilsCrossed },
  { to: "/paquetes", label: "Paquetes", icon: Package },
  { to: "/carrito", label: "Carrito", icon: ShoppingCart },
  { to: "/galeria", label: "Galería", icon: ImageIcon },
  { to: "/politicas", label: "Políticas", icon: FileText },
  { to: "/contacto", label: "Contacto", icon: Phone },
] as const;

export function AppShell() {
  const { count, bump } = useCart();
  const loc = useLocation();
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { if (bump > 0) setAnimKey((k) => k + 1); }, [bump]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#f7f7f5]">
      <div className="w-full max-w-[420px] min-h-screen bg-background relative shadow-soft flex flex-col">
        <main className="flex-1 pb-28">
          <Outlet />
        </main>

        {/* Floating cart button */}
        {loc.pathname !== "/carrito" && (
          <Link
            to="/carrito"
            aria-label="Carrito"
            className="fixed bottom-24 right-[max(1rem,calc(50vw-210px+1rem))] z-40 bg-primary text-primary-foreground h-14 w-14 rounded-full flex items-center justify-center shadow-soft active:scale-95 transition"
          >
            <span key={animKey} className="inline-flex items-center justify-center animate-bounce-cart">
              <ShoppingCart className="h-6 w-6" strokeWidth={2.25} />
            </span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-primary text-xs font-bold min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center border-2 border-primary">
                {count}
              </span>
            )}
          </Link>
        )}

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-border z-30">
          <ul className="grid grid-cols-7">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = loc.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px]"
                  >
                    <Icon
                      className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`}
                      strokeWidth={active ? 2.5 : 1.75}
                    />
                    <span className={`text-[9px] leading-tight ${active ? "text-primary font-bold" : "text-muted-foreground font-medium"}`}>
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
