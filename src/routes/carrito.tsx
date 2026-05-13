import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/carrito")({
  component: CarritoPage,
  head: () => ({ meta: [{ title: "Carrito — La Botana Rodante" }] }),
});

const WHATSAPP = "5216145154240";

function CarritoPage() {
  const { items, setQty, remove, clear, count } = useCart();
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
      <Header
        title="Carrito"
        emoji="🛒"
        subtitle={count > 0 ? `${count} producto${count !== 1 ? "s" : ""} listos para cotizar` : "Tu carrito está vacío"}
      />

      <div className="px-5 pb-4">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-border shadow-soft">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-base font-bold mb-1">Aún no has agregado nada</p>
            <p className="text-sm text-muted-foreground">Explora el menú y los paquetes</p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {Object.entries(grouped).map(([cat, list]) => (
                <section key={cat}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground mb-3">
                    <h2 className="text-xs font-extrabold uppercase tracking-wide">{cat}</h2>
                  </div>
                  <div className="space-y-2">
                    {list.map((it) => (
                      <div key={it.id} className="bg-white border border-border rounded-2xl p-3 shadow-soft flex items-center gap-3">
                        <p className="flex-1 text-base font-semibold leading-tight">{it.name}</p>
                        <div className="flex items-center gap-1.5 bg-accent rounded-full p-1">
                          <button onClick={() => setQty(it.id, it.quantity - 1)} className="h-8 w-8 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition" aria-label="menos">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-7 text-center text-base font-extrabold">{it.quantity}</span>
                          <button onClick={() => setQty(it.id, it.quantity + 1)} className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition" aria-label="más">
                            <Plus className="h-4 w-4" strokeWidth={3} />
                          </button>
                        </div>
                        <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive p-1.5" aria-label="eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-sm font-bold block mb-2">📝 Notas adicionales / personalización</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Fecha del evento, número de personas, alergias, etc."
                className="w-full rounded-2xl border-2 border-border bg-white p-4 text-base font-light focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              onClick={sendWhats}
              className="mt-5 w-full bg-primary text-primary-foreground font-extrabold py-5 rounded-full text-base active:scale-[0.98] transition shadow-soft flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar cotización por WhatsApp
            </button>
            <button onClick={clear} className="mt-3 w-full text-sm text-muted-foreground py-2 font-medium">
              Vaciar carrito
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              No se procesan pagos en línea · Te contactamos para confirmar tu cotización
            </p>
          </>
        )}
      </div>
    </div>
  );
}
