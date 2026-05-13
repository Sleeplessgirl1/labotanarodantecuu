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

const TABS = [
  { id: "Snacks", emoji: "🌮" },
  { id: "Frutas", emoji: "🍓" },
  { id: "Dulces", emoji: "🍬" },
  { id: "Cantaritos", emoji: "🍹" },
  { id: "Clamatos", emoji: "🍅" },
  { id: "Margaritas", emoji: "🍸" },
] as const;
type Tab = typeof TABS[number]["id"];

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
    toast.success(`✓ ${name} agregado`, { duration: 1300 });
  };

  return (
    <div>
      <Header title="Menú" emoji="🌮" subtitle="Toca cualquier producto para agregarlo al carrito" />

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-4 py-3 min-w-max">
            {TABS.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap min-h-[44px] flex items-center gap-1.5 transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-accent text-foreground/70"
                  }`}
                >
                  <span className="text-base">{t.emoji}</span>
                  {t.id}
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
            <div className="mb-4 rounded-2xl bg-accent border border-primary/15 p-3 text-xs font-medium">
              🌤️ Frutas frescas sujetas a temporada
            </div>
            <CategoryGroups groups={FRUTAS} onAdd={onAdd} />
          </>
        )}
        {tab === "Dulces" && <CategoryGroups groups={DULCES} onAdd={onAdd} />}
        {tab === "Cantaritos" && (
          <DrinkBlock
            tab={tab} emoji="🍹"
            description="Servido en cantarito de barro 355ml"
            ingredients="Tequila 1 oz · Squirt top · Jugo de limón 3/4 oz · Sal · Agua mineral · Escarcha de chamoy y miguelito en borde"
            options={[{ name: "Paquete 40 piezas — 1 hr de servicio", price: "$3,500" }]}
          />
        )}
        {tab === "Clamatos" && (
          <DrinkBlock
            tab={tab} emoji="🍅"
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
            tab={tab} emoji="🍸"
            description="Sabores: Tamarindo o Limón"
            ingredients="Tequila 1 oz · Jugo de limón 1 oz · Jarabe natural o tamarindo · Mineral o Squirt · Sal · Escarcha de chamoy y miguelito en borde · Vaso 9oz"
            options={[{ name: "Paquete 40 piezas", price: "$3,500" }]}
          />
        )}

        {(tab === "Cantaritos" || tab === "Clamatos" || tab === "Margaritas") && (
          <div className="mt-6 rounded-3xl bg-foreground text-white p-5">
            <p className="text-sm font-bold flex items-center gap-2">⚠️ Solo mayores de 18 años</p>
            <p className="text-xs text-white/70 mt-1.5">Versión sin alcohol disponible bajo solicitud.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryGroups({ groups, onAdd }: { groups: Record<string, string[]>; onAdd: (n: string, c: string) => void }) {
  return (
    <div className="space-y-5">
      {Object.entries(groups).map(([cat, items]) => (
        <section key={cat} className="bg-white rounded-3xl p-5 shadow-soft border border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <h2 className="text-lg font-extrabold">{cat}</h2>
            <span className="ml-auto text-xs font-bold text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => onAdd(item, cat)}
                className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-2 rounded-full border-2 border-primary/25 hover:border-primary hover:bg-primary/5 active:scale-95 transition min-h-[44px]"
              >
                <span className="text-[15px] font-medium text-foreground">{item}</span>
                <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center group-hover:rotate-90 transition">
                  <Plus className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DrinkBlock({
  tab, emoji, description, ingredients, options,
}: {
  tab: Tab;
  emoji: string;
  description?: string;
  ingredients: string;
  options: { name: string; price: string }[];
}) {
  const { add } = useCart();
  const onAdd = (name: string) => {
    add({ id: `${tab}:${name}`, name, category: tab });
    toast.success(`✓ ${name} agregado`, { duration: 1300 });
  };
  return (
    <div className="space-y-4">
      <div className="bg-primary text-primary-foreground rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-30">{emoji}</div>
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">Ingredientes</p>
        {description && <p className="mt-2 text-base font-bold">{description}</p>}
        <p className="mt-2 text-sm font-medium leading-relaxed relative">{ingredients}</p>
      </div>
      <div className="space-y-3">
        {options.map((o) => (
          <div key={o.name} className="rounded-3xl border-2 border-border bg-white p-5 shadow-soft">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-base font-bold flex-1">{o.name}</p>
              <p className="text-2xl font-black text-primary">{o.price}</p>
            </div>
            <button
              onClick={() => onAdd(`${o.name} (${tab})`)}
              className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-full text-base active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" strokeWidth={3} /> Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
