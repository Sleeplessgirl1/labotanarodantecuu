import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/paquetes")({
  component: PaquetesPage,
  head: () => ({ meta: [{ title: "Paquetes — La Botana Rodante" }] }),
});

type P = { id: string; name: string; desc: string; price: string; saving?: string };

const HAMB: P[] = [
  { id: "ham-a", name: "Paquete A", desc: "30 personas · 75 mini hamburguesas + papas francesas", price: "$2,850" },
  { id: "ham-b", name: "Paquete B", desc: "50 personas · 125 mini hamburguesas + papas francesas", price: "$5,700" },
];
const BEB: P[] = [
  { id: "beb-cant", name: "Solo Cantaritos", desc: "40 piezas · 1 hr de servicio", price: "$3,500" },
  { id: "beb-clam", name: "Solo Clamatos", desc: "40 piezas", price: "$2,800" },
  { id: "beb-marg", name: "Solo Margaritas", desc: "40 piezas", price: "$3,500" },
  { id: "beb-mezc", name: "Solo Mezcalitas", desc: "40 piezas", price: "$3,500" },
  { id: "beb-pers", name: "Cócteles Personalizados", desc: "Martinis, Cosmopolitan o Daiquiris", price: "A cotizar" },
  { id: "beb-combo2", name: "Combo Cantaritos + Clamatos", desc: "40 + 40 piezas", price: "$5,700", saving: "Ahorras $600" },
  { id: "beb-combo3", name: "Combo Triple", desc: "40 cantaritos + 40 clamatos + 40 margaritas", price: "$8,800", saving: "Ahorras $1,000" },
];
const SNACK: P[] = [
  { id: "sb-40", name: "Snack Bar 40 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$1,800" },
  { id: "sb-60", name: "Snack Bar 60 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$2,600" },
  { id: "sb-80", name: "Snack Bar 80 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$3,500" },
  { id: "sb-100", name: "Snack Bar 100 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$4,400" },
];

function PaquetesPage() {
  return (
    <div>
      <Header kicker="Combos" title="Paquetes" />
      <div className="px-6 space-y-10 pb-4">
        <Section title="Hamburguesas" packs={HAMB} category="Paquete Hamburguesas" />
        <Section title="Bebidas" packs={BEB} category="Paquete Bebidas" />
        <Section title="Snack Bar" packs={SNACK} category="Paquete Snack Bar" footer="Refill hasta agotar stock" />
      </div>
    </div>
  );
}

function Section({
  title, packs, category, footer,
}: { title: string; packs: P[]; category: string; footer?: string }) {
  const { add, items } = useCart();
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground mb-4">{title}</h2>
      <div className="space-y-3">
        {packs.map((p, idx) => {
          const inCart = items.some((i) => i.id === p.id);
          return (
            <div
              key={p.id}
              className="rounded-[22px] border border-border p-5 animate-fade-up transition hover:border-primary/40"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-[16px] leading-tight">{p.name}</h3>
                  <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug">{p.desc}</p>
                </div>
                <p className="text-xl font-black text-foreground whitespace-nowrap tracking-tight">{p.price}</p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                {p.saving ? (
                  <span className="text-[11px] font-bold text-primary">{p.saving}</span>
                ) : <span />}

                <button
                  onClick={() => add({ id: p.id, name: `${p.name} — ${p.price}`, category })}
                  className={`font-bold px-5 py-2.5 rounded-full text-sm active:scale-95 transition flex items-center gap-1.5 ${
                    inCart ? "bg-foreground text-white" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                  {inCart ? "Agregar otro" : "Agregar"}
                </button>
              </div>
            </div>
          );
        })}
        {footer && <p className="text-[11px] text-muted-foreground text-center pt-2 italic">{footer}</p>}
      </div>
    </section>
  );
}
