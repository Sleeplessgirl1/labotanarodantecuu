import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({ meta: [{ title: "Menú — La Botana Rodante" }] }),
});

const TABS = ["Snacks", "Frutas", "Dulces", "Mini Burgers", "Cantaritos", "Clamatos", "Margaritas"] as const;
type Tab = typeof TABS[number];

const MINI_BURGERS = [
  { name: "Paquete A — 30 personas", desc: "75 mini hamburguesas + papas francesas", price: "$2,850" },
  { name: "Paquete B — 50 personas", desc: "125 mini hamburguesas + papas francesas", price: "$5,700" },
];

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

const TOPPING_CATS = ["Papas","Cacahuates","Botanas","Frutas Frescas","Verduras","Gomitas y dulces blandos","Tamarindo","Paletas","Otros"];
const TOPPING_LIMIT = 10;

function MenuPage() {
  const [tab, setTab] = useState<Tab>("Snacks");
  const [limitFlash, setLimitFlash] = useState(false);
  const { add, items } = useCart();
  const inCart = (id: string) => items.some((i) => i.id === id);

  const toppingCount = items
    .filter((i) => TOPPING_CATS.includes(i.category))
    .reduce((s, i) => s + i.quantity, 0);

  const isToppingTab = (["Snacks","Frutas","Dulces"] as Tab[]).includes(tab);

  const onAdd = (name: string, category: string) => {
    const id = `${category}:${name}`;
    if (TOPPING_CATS.includes(category) && !inCart(id) && toppingCount >= TOPPING_LIMIT) {
      setLimitFlash(true);
      setTimeout(() => setLimitFlash(false), 1800);
      return;
    }
    add({ id, name, category });
  };

  return (
    <div>
      <Header kicker="Catálogo" title="Menú" />

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 px-6 py-3 min-w-max">
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  data-active={active}
                  className={`underline-grow text-sm font-bold whitespace-nowrap min-h-[36px] transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-px bg-border" />
      </div>

      <div key={tab} className="px-6 py-6 animate-fade-up">
        {tab === "Snacks" && <CategoryGroups groups={SNACKS} onAdd={onAdd} inCart={inCart} />}
        {tab === "Frutas" && (
          <>
            <p className="text-xs text-muted-foreground mb-4 italic">Frutas frescas sujetas a temporada</p>
            <CategoryGroups groups={FRUTAS} onAdd={onAdd} inCart={inCart} />
          </>
        )}
        {tab === "Dulces" && <CategoryGroups groups={DULCES} onAdd={onAdd} inCart={inCart} />}
        {tab === "Mini Burgers" && (
          <DrinkBlock
            tab={tab}
            description="Mini hamburguesas armadas al momento + papas francesas crujientes"
            ingredients="Pan brioche · carne sellada · queso americano · cebolla caramelizada · pepinillo · salsa de la casa"
            options={MINI_BURGERS}
          />
        )}
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
          <p className="mt-8 text-xs text-muted-foreground text-center border-t border-border pt-5">
            Solo mayores de 18 años · Versión sin alcohol disponible bajo solicitud
          </p>
        )}

        {/* Persuasive CTA at bottom of every tab */}
        <div className="mt-10 rounded-[22px] bg-primary/8 border border-primary/20 p-5 text-center">
          <p className="text-[13px] text-foreground/70 leading-snug">
            ¿Listo para tu evento?
          </p>
          <p className="font-extrabold text-[17px] mt-1 leading-tight">
            Arma tu lista y te cotizamos por WhatsApp en minutos
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryGroups({
  groups, onAdd, inCart,
}: {
  groups: Record<string, string[]>;
  onAdd: (n: string, c: string) => void;
  inCart: (id: string) => boolean;
}) {
  const entries = Object.entries(groups);
  return (
    <div className="space-y-8">
      {entries.map(([cat, items], idx) => (
        <section key={cat} className="animate-fade-up" style={{ animationDelay: `${idx * 60}ms` }}>
          <h2 className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground mb-3">{cat}</h2>
          <ul className="divide-y divide-border">
            {items.map((item) => {
              const id = `${cat}:${item}`;
              const added = inCart(id);
              return (
                <li key={item} className="flex items-center justify-between py-3.5">
                  <span className="text-[15px] font-medium">{item}</span>
                  <button
                    onClick={() => onAdd(item, cat)}
                    aria-label={`Agregar ${item}`}
                    className={`h-9 w-9 rounded-full flex items-center justify-center transition active:scale-90 ${
                      added
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {added ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </ul>
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
  const onAdd = (name: string) => add({ id: `${tab}:${name}`, name, category: tab });
  return (
    <div className="space-y-5">
      {description && <p className="text-base font-medium">{description}</p>}

      <div>
        <p className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground mb-2">Ingredientes</p>
        <p className="text-[15px] leading-relaxed text-foreground/80">{ingredients}</p>
      </div>

      <div className="border-t border-border pt-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground">Opciones</p>
        {options.map((o, idx) => (
          <div key={o.name} className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0 animate-fade-up" style={{ animationDelay: `${idx * 80}ms` }}>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium">{o.name}</p>
              <p className="text-lg font-extrabold text-primary mt-0.5">{o.price}</p>
            </div>
            <button
              onClick={() => onAdd(`${o.name} (${tab})`)}
              className="bg-foreground text-white font-bold px-5 py-3 rounded-full text-sm active:scale-95 transition"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
