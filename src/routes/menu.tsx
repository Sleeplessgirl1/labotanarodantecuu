import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, Leaf } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({ meta: [{ title: "Menú — La Botana Rodante" }] }),
});

const TABS = ["Snacks", "Frutas", "Dulces", "Mini Burgers", "Cantaritos", "Clamatos", "Margaritas", "Mezcalitas", "Personalizados"] as const;
type Tab = typeof TABS[number];

const TAB_GROUPS: { label: string | null; tabs: Tab[] }[] = [
  { label: "Snack Bar", tabs: ["Snacks", "Frutas", "Dulces"] },
  { label: null, tabs: ["Mini Burgers"] },
  { label: "Drinks", tabs: ["Cantaritos", "Clamatos", "Margaritas", "Mezcalitas", "Personalizados"] },
];

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
};
const DULCES: Record<string, string[]> = {
  "Gomitas y dulces blandos": ["Pingüinos", "Cerezas", "Dientes", "Panditas", "Lombriz", "Lombriz Neón", "Frutitas Azúcar", "Fruta Enchilada", "Aros Durazno", "Aros Manzana", "Manguitos", "Manguitos Enchilados", "Chocolates", "Tiburones"],
  "Tamarindo": ["Tamarindo Enchilado", "Tamarindo Azúcar", "Pulparindots", "Pulparindo", "Rellerindos"],
  "Paletas": ["Paleta Elote", "Paleta Cerveza", "Paleta Mango"],
  "Otros": ["Picafresa", "Tamborcito", "Banderilla Enchilada", "Banderilla Azúcar"],
};

const HEALTHY_CATS = ["Frutas Frescas", "Verduras"];

const TOPPING_CATS = ["Papas","Cacahuates","Botanas","Frutas Frescas","Verduras","Gomitas y dulces blandos","Tamarindo","Paletas","Otros"];
const TOPPING_LIMIT = 10;

const DRINK_TABS: Tab[] = ["Cantaritos", "Clamatos", "Margaritas", "Mezcalitas", "Personalizados"];

function MenuPage() {
  const [tab, setTab] = useState<Tab>("Snacks");
  const [limitFlash, setLimitFlash] = useState(false);
  const { add, items, setQty } = useCart();
  const qtyOf = (id: string) => items.find((i) => i.id === id)?.quantity ?? 0;

  const toppingCount = items
    .filter((i) => TOPPING_CATS.includes(i.category))
    .reduce((s, i) => s + i.quantity, 0);

  const isToppingTab = (["Snacks","Frutas","Dulces"] as Tab[]).includes(tab);

  const onAdd = (name: string, category: string) => {
    const id = `${category}:${name}`;
    if (TOPPING_CATS.includes(category) && toppingCount >= TOPPING_LIMIT) {
      setLimitFlash(true);
      setTimeout(() => setLimitFlash(false), 1800);
      return;
    }
    add({ id, name, category });
  };
  const onRemove = (name: string, category: string) => {
    const id = `${category}:${name}`;
    const q = qtyOf(id);
    if (q > 0) setQty(id, q - 1);
  };

  return (
    <div>
      <Header kicker="Catálogo" title="Menú" />

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-end gap-7 px-6 pt-2 pb-3 min-w-max">
            {TAB_GROUPS.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-1.5">
                {group.label ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70 px-0.5">
                      {group.label}
                    </span>
                    <div className="h-px bg-border" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-transparent select-none px-0.5">·</span>
                    <div className="h-px bg-transparent" />
                  </div>
                )}
                <div className="flex gap-5">
                  {group.tabs.map((t) => {
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
            ))}
          </div>
        </div>
        <div className="h-px bg-border" />
      </div>

      {isToppingTab && (
        <div className="px-6 pt-4">
          <div className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors ${
            limitFlash ? "border-primary bg-primary/10" : toppingCount >= TOPPING_LIMIT ? "border-primary/40 bg-primary/5" : "border-border bg-accent/40"
          }`}>
            <p className="text-[13px] leading-snug font-medium text-foreground/80">
              Elige hasta <b className="text-foreground">10 toppings</b> entre Snacks, Frutas y Dulces
            </p>
            <span className={`shrink-0 text-sm font-extrabold tabular-nums ${toppingCount >= TOPPING_LIMIT ? "text-primary" : "text-foreground"}`}>
              {toppingCount}/{TOPPING_LIMIT}
            </span>
          </div>
          {limitFlash && (
            <p className="mt-2 text-[12px] font-semibold text-primary animate-fade-up">
              Llegaste al máximo de 10 toppings. Quita uno para agregar otro.
            </p>
          )}
        </div>
      )}

      <div key={tab} className="px-6 py-6 animate-fade-up">
        {tab === "Snacks" && <CategoryGroups groups={SNACKS} onAdd={onAdd} onRemove={onRemove} qtyOf={qtyOf} atLimit={toppingCount >= TOPPING_LIMIT} />}
        {tab === "Frutas" && (
          <>
            <p className="text-xs text-muted-foreground mb-4 italic">Frutas frescas sujetas a temporada</p>
            <CategoryGroups groups={FRUTAS} onAdd={onAdd} onRemove={onRemove} qtyOf={qtyOf} atLimit={toppingCount >= TOPPING_LIMIT} />
          </>
        )}
        {tab === "Dulces" && <CategoryGroups groups={DULCES} onAdd={onAdd} onRemove={onRemove} qtyOf={qtyOf} atLimit={toppingCount >= TOPPING_LIMIT} />}
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
            description="Servido en cantarito de barro"
            ingredients="Tequila · Squirt · Jugo de limón · Sal · Agua mineral · Escarcha de chamoy y miguelito en borde"
            options={[{ name: "Paquete 40 piezas — 1 hr de servicio", price: "$3,500" }]}
          />
        )}
        {tab === "Clamatos" && (
          <DrinkBlock
            tab={tab}
            ingredients="Clamato · Cerveza Modelo o Carta Blanca · Jugo de limón · Apio · Cacahuates · Salsas · Limón · Chile (Carne seca: extra a cotizar)"
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
            ingredients="Tequila · Jugo de limón · Jarabe natural o tamarindo · Mineral o Squirt · Sal · Escarcha de chamoy y miguelito en borde"
            options={[{ name: "Paquete 40 piezas", price: "$3,500" }]}
          />
        )}
        {tab === "Mezcalitas" && (
          <DrinkBlock
            tab={tab}
            description="Sabores: Tamarindo, Mango o Maracuyá"
            ingredients="Mezcal · Jugo de limón · Jarabe natural · Escarcha de sal con chile · Limón"
            options={[{ name: "Paquete 40 piezas", price: "$3,500" }]}
          />
        )}
        {tab === "Personalizados" && (
          <DrinkBlock
            tab={tab}
            description="Cócteles personalizados para tu evento"
            ingredients="Martinis · Cosmopolitan · Daiquiris"
            options={[
              { name: "Martinis — paquete personalizado", price: "A cotizar" },
              { name: "Cosmopolitan — paquete personalizado", price: "A cotizar" },
              { name: "Daiquiris — paquete personalizado", price: "A cotizar" },
            ]}
          />
        )}

        {DRINK_TABS.includes(tab) && (
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
  groups, onAdd, onRemove, qtyOf, atLimit,
}: {
  groups: Record<string, string[]>;
  onAdd: (n: string, c: string) => void;
  onRemove: (n: string, c: string) => void;
  qtyOf: (id: string) => number;
  atLimit: boolean;
}) {
  const entries = Object.entries(groups);
  return (
    <div className="space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
      {entries.map(([cat, items], idx) => {
        const healthy = HEALTHY_CATS.includes(cat);
        return (
          <section key={cat} className="animate-fade-up" style={{ animationDelay: `${idx * 60}ms` }}>
            <h2 className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground mb-3 flex items-center gap-1.5">
              {cat}
              {healthy && (
                <span className="inline-flex items-center gap-1 normal-case tracking-normal text-[10px] font-bold text-green-700 bg-green-100 rounded-full px-2 py-0.5">
                  <Leaf className="h-3 w-3" strokeWidth={2.5} />
                  Healthy
                </span>
              )}
            </h2>
            <ul className="divide-y divide-border">
              {items.map((item) => {
                const id = `${cat}:${item}`;
                const qty = qtyOf(id);
                const added = qty > 0;
                const plusDisabled = atLimit;
                return (
                  <li key={item} className="flex items-center justify-between gap-3 py-3.5">
                    <span className="text-[15px] font-medium flex-1 min-w-0 flex items-center gap-1.5">
                      {item}
                      {healthy && <Leaf className="h-3.5 w-3.5 text-green-600 shrink-0" strokeWidth={2.2} />}
                    </span>
                    {added ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRemove(item, cat)}
                          aria-label={`Quitar ${item}`}
                          className="h-9 w-9 rounded-full flex items-center justify-center bg-accent text-foreground hover:bg-foreground hover:text-background transition active:scale-90"
                        >
                          <Minus className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        <span className="text-sm font-extrabold tabular-nums w-5 text-center">{qty}</span>
                        <button
                          onClick={() => onAdd(item, cat)}
                          disabled={plusDisabled}
                          aria-label={`Agregar ${item}`}
                          className="h-9 w-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAdd(item, cat)}
                        disabled={plusDisabled}
                        aria-label={`Agregar ${item}`}
                        className="h-9 w-9 rounded-full flex items-center justify-center bg-accent text-foreground hover:bg-primary hover:text-primary-foreground transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
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
