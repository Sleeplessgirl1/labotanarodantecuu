import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/paquetes")({
  component: PaquetesPage,
  head: () => ({ meta: [{ title: "Paquetes — La Botana Rodante" }] }),
});

type P = { id: string; name: string; desc: string; price: string; saving?: string; emoji: string };

const HAMB: P[] = [
  { id: "ham-a", emoji: "🍔", name: "Paquete A", desc: "30 personas · 75 mini hamburguesas + papas francesas", price: "$2,850" },
  { id: "ham-b", emoji: "🍔", name: "Paquete B", desc: "50 personas · 125 mini hamburguesas + papas francesas", price: "$5,700" },
];
const BEB: P[] = [
  { id: "beb-cant", emoji: "🍹", name: "Solo Cantaritos", desc: "40 piezas · 1 hr de servicio", price: "$3,500" },
  { id: "beb-clam", emoji: "🍅", name: "Solo Clamatos", desc: "40 piezas", price: "$2,800" },
  { id: "beb-marg", emoji: "🍸", name: "Solo Margaritas", desc: "40 piezas", price: "$3,500" },
  { id: "beb-combo2", emoji: "🥂", name: "Combo Cantaritos + Clamatos", desc: "40 + 40 piezas", price: "$5,700", saving: "Ahorras $600" },
  { id: "beb-combo3", emoji: "🎉", name: "Combo Triple", desc: "40 cantaritos + 40 clamatos + 40 margaritas", price: "$8,800", saving: "Ahorras $1,000" },
];
const SNACK: P[] = [
  { id: "sb-40", emoji: "🍿", name: "Snack Bar 40 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$1,800" },
  { id: "sb-60", emoji: "🍿", name: "Snack Bar 60 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$2,600" },
  { id: "sb-80", emoji: "🍿", name: "Snack Bar 80 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$3,500" },
  { id: "sb-100", emoji: "🍿", name: "Snack Bar 100 personas", desc: "2 porciones por persona · hasta 10 toppings", price: "$4,400" },
];

function PaquetesPage() {
  return (
    <div>
      <Header title="Paquetes" emoji="🎁" subtitle="Combos pensados para tu evento" />
      <div className="px-5 space-y-7 pb-4">
        <Section title="Hamburguesas" tone="primary" packs={HAMB} category="Paquete Hamburguesas" />
        <Section title="Bebidas" tone="dark" packs={BEB} category="Paquete Bebidas" />
        <Section title="Snack Bar" tone="primary" packs={SNACK} category="Paquete Snack Bar" footer="Refill hasta agotar stock" />
      </div>
    </div>
  );
}

function Section({
  title, packs, category, footer, tone,
}: { title: string; packs: P[]; category: string; footer?: string; tone: "primary" | "dark" }) {
  const { add } = useCart();
  return (
    <section>
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
        tone === "primary" ? "bg-primary text-primary-foreground" : "bg-foreground text-white"
      }`}>
        <h2 className="text-base font-extrabold uppercase tracking-wide">{title}</h2>
      </div>

      <div className="space-y-3">
        {packs.map((p) => (
          <div key={p.id} className="rounded-3xl bg-white border border-border p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center text-3xl shrink-0">
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-base leading-tight">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-snug">{p.desc}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-black text-primary leading-none">{p.price}</p>
                {p.saving && (
                  <span className="inline-block mt-1.5 text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    💰 {p.saving}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  add({ id: p.id, name: `${p.name} — ${p.price}`, category });
                  toast.success(`✓ ${p.name} agregado`, { duration: 1300 });
                }}
                className="bg-primary text-primary-foreground font-bold px-5 py-3 rounded-full text-sm active:scale-95 transition flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" strokeWidth={3} /> Agregar
              </button>
            </div>
          </div>
        ))}
        {footer && <p className="text-xs text-muted-foreground text-center pt-1">✨ {footer}</p>}
      </div>
    </section>
  );
}
