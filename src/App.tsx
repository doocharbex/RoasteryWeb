import { useCallback, useRef, useState } from "react";
import { CartDrawer, CartLine, Footer, Header, Ticker, Toast } from "./components/Chrome";
import { Hero, Shop, StatsBand, Subscription } from "./components/Sections";
import { BrewGuide, Cafes, Journal, Newsletter, Story } from "./components/Sections2";
import { fa, Product } from "./data";
import { useRevealScope } from "./hooks";

export default function App() {
  const scope = useRevealScope<HTMLDivElement>();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [ordered, setOrdered] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const bump = (id: string, qty: number, make: () => CartLine) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      if (found) return ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + qty) } : l));
      return [...ls, make()];
    });
  };

  const addProduct = (p: Product) => {
    bump(p.id, 1, () => ({
      id: p.id,
      name: p.name,
      meta: `${p.origin} · ${p.weight}`,
      price: p.price,
      qty: 1,
      image: p.image,
    }));
    showToast(`«${p.name}» به سبد اضافه شد`);
  };

  const addSub = (name: string, meta: string, price: number) => {
    bump("sub", 1, () => ({ id: "sub", name, meta, price, qty: 1 }));
    showToast("اشتراک شما به سبد اضافه شد");
    setTimeout(() => setCartOpen(true), 500);
  };

  const setQty = (id: string, d: number) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + d) } : l)));

  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));

  const checkout = () => {
    const code = `NL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrdered(code);
    setLines([]);
  };

  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div ref={scope} className="noise min-h-screen">
      <Ticker />
      <Header cartCount={count} onCartOpen={() => { setOrdered(null); setCartOpen(true); }} />

      <main>
        <Hero />
        <StatsBand />
        <Shop onAdd={addProduct} />
        <Subscription onAddSub={addSub} />
        <Story />
        <Cafes />
        <BrewGuide />
        <Journal />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => { setCartOpen(false); setOrdered(null); }}
        onQty={setQty}
        onRemove={remove}
        onCheckout={checkout}
        ordered={ordered}
      />
      <Toast msg={toast} />

      {/* floating back-to-top */}
      <a
        href="#top"
        aria-label="بازگشت به بالای صفحه"
        className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-card border border-line text-ink shadow-lg flex items-center justify-center hover:bg-nili hover:text-paper hover:border-nili hover:-translate-y-1 transition-all duration-300"
      >
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
      </a>

      <p className="sr-only">فروشگاه قهوهٔ تخصصی نیلی — {fa(1404)}</p>
    </div>
  );
}
