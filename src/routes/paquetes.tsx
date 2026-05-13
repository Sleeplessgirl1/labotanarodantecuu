import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Header } from "@/components/Header";

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
      <Header title="Paquetes" subtitle="Combos pensados para tu evento" />
      <div className="px-5 space-y-8 pb-4">
        <Section title="Hamburguesas" packs={HAMB} category="Paquete Hamburguesas" />
        <Section title="Bebidas" packs={BEB} category="Paquete Bebidas" />
        <Section
          title="Snack Bar"
          packs={SNACK}
          category="Paquete Snack Bar"
          footer="Refill hasta agotar stock"
        />
      </div>
    </div>
  );
}

function Section({ title, packs, category, footer }: { title: string; packs: P[]; category: string; footer?: string }) {
  const { add } = useCart();
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <h2 className="text-base font-bold">{title}</h2>
      </div>
      <div className="space-y-3">
        {packs.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white border border-border p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-[15px]">{p.name}</h3>
                <p className="text-xs text-muted-foreground font-light mt-1 leading-relaxed">{p.desc}</p>
                {p.saving && (
                  <span className="inline-block mt-2 text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {p.saving}
                  </span>
                )}
              </div>
              <p className="text-xl font-extrabold text-primary whitespace-nowrap">{p.price}</p>
            </div>
            <button
              onClick={() => {
                add({ id: p.id, name: `${p.name} — ${p.price}`, category });
                toast.success(`${p.name} agregado`, { duration: 1500 });
              }}
              className="mt-3 w-full bg-primary text-primary-foreground font-bold py-3 rounded-full text-sm active:scale-[0.98] transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
        {footer && <p className="text-[11px] text-muted-foreground font-light text-center">{footer}</p>}
      </div>
    </section>
  );
}
