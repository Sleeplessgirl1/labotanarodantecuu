import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Minus, Plus, X, ArrowRight } from "lucide-react";

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
        kicker={count > 0 ? `${count} producto${count !== 1 ? "s" : ""}` : "Vacío"}
        title="Carrito"
      />

      <div className="px-6 pb-6">
        {items.length === 0 ? (
          <div className="text-center py-20 animate-fade-up">
            <div className="mx-auto h-16 w-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
              <Plus className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <p className="mt-5 text-base font-bold">Aún no has agregado nada</p>
            <p className="mt-1 text-sm text-muted-foreground">Explora el menú y los paquetes</p>
          </div>
        ) : (
          <>
            <div className="space-y-7">
              {Object.entries(grouped).map(([cat, list], gi) => (
                <section key={cat} className="animate-fade-up" style={{ animationDelay: `${gi * 60}ms` }}>
                  <h2 className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground mb-2">{cat}</h2>
                  <ul className="divide-y divide-border">
                    {list.map((it) => (
                      <li key={it.id} className="flex items-center gap-3 py-3.5">
                        <p className="flex-1 text-[15px] font-medium leading-tight">{it.name}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(it.id, it.quantity - 1)}
                            className="h-8 w-8 rounded-full border border-border flex items-center justify-center active:scale-90 transition"
                            aria-label="menos"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold tabular-nums">{it.quantity}</span>
                          <button
                            onClick={() => setQty(it.id, it.quantity + 1)}
                            className="h-8 w-8 rounded-full bg-foreground text-white flex items-center justify-center active:scale-90 transition"
                            aria-label="más"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                          </button>
                        </div>
                        <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive p-1 -mr-1" aria-label="eliminar">
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-8 animate-fade-up">
              <label className="text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground block mb-2">
                Notas adicionales
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Fecha del evento, número de personas, alergias…"
                className="w-full rounded-2xl border border-border bg-muted p-4 text-[15px] focus:outline-none focus:border-primary focus:bg-background transition resize-none"
              />
            </div>

            <button
              onClick={sendWhats}
              className="mt-5 w-full bg-primary text-primary-foreground font-extrabold py-5 rounded-full text-base active:scale-[0.99] transition flex items-center justify-center gap-2 group"
            >
              Enviar cotización por WhatsApp
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>

            <button onClick={clear} className="mt-3 w-full text-xs text-muted-foreground py-2 hover:text-destructive transition">
              Vaciar carrito
            </button>

            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              Sin pagos en línea · Te contactamos para confirmar
            </p>
          </>
        )}
      </div>
    </div>
  );
}
