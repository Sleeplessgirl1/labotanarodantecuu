import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/carrito")({
  component: CarritoPage,
  head: () => ({ meta: [{ title: "Carrito — La Botana Rodante" }] }),
});

const WHATSAPP = "5216145154240";

function CarritoPage() {
  const { items, setQty, remove, clear } = useCart();
  const [notes, setNotes] = useState("");

  const grouped = useMemo(() => {
    const m: Record<string, typeof items> = {};
    for (const it of items) (m[it.category] ||= []).push(it);
    return m;
  }, [items]);

  const sendWhats = () => {
    const lines = items.map((i) => `• ${i.name} (${i.category}) x${i.quantity}`).join("\n");
    const msg =
      `Hola! Me interesa cotizar lo siguiente con La Botana Rodante:\n${lines}\n` +
      `Notas: ${notes || "(sin notas)"}\n` +
      `¿Me pueden dar más información? Gracias!`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div>
      <Header title="Carrito" subtitle="Revisa tus productos y envía la cotización" />

      <div className="px-5 pb-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-sm text-muted-foreground font-light">Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {Object.entries(grouped).map(([cat, list]) => (
                <section key={cat}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-wide">{cat}</h2>
                  </div>
                  <div className="space-y-2">
                    {list.map((it) => (
                      <div key={it.id} className="bg-white border border-border rounded-2xl p-3 shadow-soft flex items-center gap-3">
                        <p className="flex-1 text-sm font-medium">{it.name}</p>
                        <div className="flex items-center gap-2 bg-accent rounded-full px-1 py-1">
                          <button onClick={() => setQty(it.id, it.quantity - 1)} className="h-7 w-7 rounded-full bg-white border border-border flex items-center justify-center" aria-label="menos">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{it.quantity}</span>
                          <button onClick={() => setQty(it.id, it.quantity + 1)} className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center" aria-label="más">
                            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                          </button>
                        </div>
                        <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive p-1" aria-label="eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium block mb-2">Notas adicionales / personalización</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Fecha del evento, número de personas, alergias, etc."
                className="w-full rounded-2xl border border-border bg-white p-3 text-sm font-light focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              onClick={sendWhats}
              className="mt-5 w-full bg-primary text-primary-foreground font-bold py-4 rounded-full text-base active:scale-[0.98] transition shadow-soft"
            >
              Enviar cotización por WhatsApp
            </button>
            <button onClick={clear} className="mt-3 w-full text-xs text-muted-foreground py-2">
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}
