import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({ meta: [{ title: "Menú — La Botana Rodante" }] }),
});

const TABS = ["Snacks", "Frutas", "Dulces", "Cantaritos", "Clamatos", "Margaritas"] as const;
type Tab = typeof TABS[number];

const SNACKS: Record<string, string[]> = {
  "Papas": ["Salada", "Adobada", "Queso"],
  "Cacahuates": ["Natural", "Salado", "Enchilado", "Japonés", "Español", "Queso"],
  "Botanas": ["Nachos", "Doritos", "Cueritos", "Churrito Natural", "Churrito Enchilado", "Lagrimitas"],
};

const FRUTAS: Record<string, string[]> = {
  "Frutas Frescas": ["Sandía", "Melón", "Piña", "Fresas", "Mango"],
  "Verduras": ["Pepino", "Jícama", "Zanahoria"],
  "Gomitas y dulces blandos": ["Pingüinos", "Cerezas", "Dientes", "Panditas", "Lombriz", "Lombriz Neón", "Frutitas Azúcar", "Fruta Enchilada", "Aros Durazno", "Aros Manzana", "Manguitos", "Manguitos Enchilados", "Chocolates", "Tiburones"],
};

const DULCES: Record<string, string[]> = {
  "Tamarindo": ["Tamarindo Enchilado", "Tamarindo Azúcar", "Pulparindots", "Pulparindo", "Rellerindos"],
  "Paletas": ["Paleta Elote", "Paleta Cerveza", "Paleta Mango"],
  "Otros": ["Picafresa", "Tamborcito", "Banderilla Enchilada", "Banderilla Azúcar"],
};

function MenuPage() {
  const [tab, setTab] = useState<Tab>("Snacks");
  const { add } = useCart();

  const onAdd = (name: string, category: string) => {
    add({ id: `${category}:${name}`, name, category });
    toast.success(`${name} agregado`, { duration: 1500 });
  };

  return (
    <div>
      <Header title="Menú" subtitle="Elige tus favoritos y agrégalos al carrito" />

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-1 px-4 py-2 min-w-max">
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-2 text-sm font-medium relative whitespace-nowrap min-h-[44px] ${active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {t}
                  {active && <span className="absolute left-2 right-2 -bottom-px h-[3px] bg-primary rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        {tab === "Snacks" && <CategoryGroups groups={SNACKS} onAdd={onAdd} />}
        {tab === "Frutas" && (
          <>
            <p className="text-xs text-muted-foreground mb-4 font-light">Frutas frescas sujetas a temporada</p>
            <CategoryGroups groups={FRUTAS} onAdd={onAdd} />
          </>
        )}
        {tab === "Dulces" && <CategoryGroups groups={DULCES} onAdd={onAdd} />}
        {tab === "Cantaritos" && (
          <DrinkBlock
            tab={tab}
            description="Servido en cantarito de barro 355ml"
            ingredients="Tequila 1 oz · Squirt top · Jugo de limón 3/4 oz · Sal · Agua mineral · Escarcha de chamoy y miguelito en borde"
            options={[{ name: "Paquete 40 piezas — 1 hr de servicio", price: "$3,500" }]}
          />
        )}
        {tab === "Clamatos" && (
          <DrinkBlock
            tab={tab}
            ingredients="Clamato 150ml · Cerveza Modelo o Carta Blanca · Jugo de limón 1 oz · Apio · Cacahuates · Salsas · Limón · Chile (Carne seca: extra a cotizar)"
            options={[
              { name: "Medio litro", price: "$70" },
              { name: "Litro", price: "$130" },
              { name: "Paquete 40 piezas", price: "$2,800" },
            ]}
          />
        )}
        {tab === "Margaritas" && (
          <DrinkBlock
            tab={tab}
            description="Sabores: Tamarindo o Limón"
            ingredients="Tequila 1 oz · Jugo de limón 1 oz · Jarabe natural o tamarindo · Mineral o Squirt · Sal · Escarcha de chamoy y miguelito en borde · Vaso 9oz"
            options={[{ name: "Paquete 40 piezas", price: "$3,500" }]}
          />
        )}

        {(tab === "Cantaritos" || tab === "Clamatos" || tab === "Margaritas") && (
          <div className="mt-5 rounded-2xl bg-accent border border-primary/20 p-4 text-xs text-foreground font-medium">
            ⚠️ Solo mayores de 18 años. Versión sin alcohol disponible bajo solicitud.
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryGroups({ groups, onAdd }: { groups: Record<string, string[]>; onAdd: (n: string, c: string) => void }) {
  const keys = Object.keys(groups);
  return (
    <div className="space-y-6">
      {keys.map((cat, i) => (
        <section key={cat}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="text-base font-bold">{cat}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {groups[cat].map((item) => (
              <button
                key={item}
                onClick={() => onAdd(item, cat)}
                className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/5 transition min-h-[36px]"
              >
                <span className="text-sm font-light text-foreground">{item}</span>
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center">
                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </button>
            ))}
          </div>
          {i < keys.length - 1 && <div className="mt-6 border-t border-border" />}
        </section>
      ))}
    </div>
  );
}

function DrinkBlock({
  tab, description, ingredients, options,
}: {
  tab: Tab;
  description?: string;
  ingredients: string;
  options: { name: string; price: string }[];
}) {
  const { add } = useCart();
  const onAdd = (name: string) => {
    add({ id: `${tab}:${name}`, name, category: tab });
    toast.success(`${name} agregado`, { duration: 1500 });
  };
  return (
    <div className="space-y-4">
      {description && <p className="text-sm font-medium">{description}</p>}
      <div className="rounded-2xl bg-accent p-4">
        <p className="text-[11px] uppercase tracking-wider font-bold text-primary mb-2">Ingredientes</p>
        <p className="text-sm font-light leading-relaxed">{ingredients}</p>
      </div>
      <div className="space-y-2">
        {options.map((o) => (
          <div key={o.name} className="rounded-2xl border border-border bg-white p-4 shadow-soft">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium">{o.name}</p>
              <p className="text-lg font-extrabold text-primary">{o.price}</p>
            </div>
            <button
              onClick={() => onAdd(`${o.name} (${tab})`)}
              className="mt-3 w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-full text-sm active:scale-[0.98] transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
