import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Package, Image as ImageIcon, ShoppingBag } from "lucide-react";
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

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#fafaf7]">
      <div className="w-full max-w-[420px] min-h-screen bg-background relative flex flex-col">
        <main className="flex-1 pb-24">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-background/95 backdrop-blur border-t border-border z-30">
          <ul className="grid grid-cols-5 px-2 pt-1.5 pb-3">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = loc.pathname === to;
              const isCart = to === "/carrito";
              return (
                <li key={to}>
                  <Link to={to} className="flex flex-col items-center gap-1 py-2 group">
                    <span className="relative">
                      <Icon
                        className={`h-[22px] w-[22px] transition-all duration-300 ${
                          active ? "text-primary scale-110" : "text-muted-foreground group-active:scale-90"
                        }`}
                        strokeWidth={active ? 2.25 : 1.75}
                      />
                      {isCart && count > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center animate-pop">
                          {count}
                        </span>
                      )}
                    </span>
                    <span className={`text-[10px] tracking-tight transition-colors ${active ? "text-primary font-semibold" : "text-muted-foreground font-medium"}`}>
                      {label}
                    </span>
                    <span className={`h-[2px] w-1 rounded-full transition-all duration-300 ${active ? "bg-primary w-5" : "bg-transparent"}`} />
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
