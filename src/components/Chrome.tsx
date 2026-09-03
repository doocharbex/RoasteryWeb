import { useEffect, useState } from "react";
import { fa, money, NAV, TICKER_ITEMS } from "../data";

/* ============ custom icons ============ */
export const BottleLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <rect x="1" y="1" width="38" height="38" rx="9" fill="currentColor" opacity="0.12" />
    <path
      d="M15 7h6a1.6 1.6 0 0 1 1.6 1.6V12a7 7 0 0 1 3.4 6v13a2.4 2.4 0 0 1-2.4 2.4H16.4A2.4 2.4 0 0 1 14 31V18a7 7 0 0 1 3.4-6V8.6A1.6 1.6 0 0 1 15 7z"
      fill="currentColor"
    />
    <circle cx="20" cy="23" r="3.4" fill="var(--color-paper)" />
  </svg>
);

export const CartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M4 7h2l2.2 10.2A1.6 1.6 0 0 0 9.8 18.5h8.6a1.6 1.6 0 0 0 1.6-1.3L21.5 10H7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10.4" cy="21.2" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.8" cy="21.2" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

const Steam = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={`steam ${className}`} aria-hidden="true">
    <path d="M8 14c-1.5-2 1.5-3.5 0-6" />
    <path d="M12.5 15c-1.5-2 1.5-3.5 0-6.5" />
    <path d="M17 14c-1.5-2 1.5-3.5 0-6" />
  </svg>
);

const ArrowLeft = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ============ announcement ticker ============ */
export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-ink text-paper overflow-hidden marquee" dir="ltr" aria-hidden="true">
      <div className="marquee-track py-2">
        {items.map((t, i) => (
          <span key={i} dir="rtl" className="flex items-center gap-6 px-6 text-[12.5px] tracking-wide whitespace-nowrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ header ============ */
export function Header({
  cartCount,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-line shadow-[0_10px_40px_-20px_rgba(27,21,13,0.25)]"
          : "bg-paper border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-nili shrink-0 group">
          <BottleLogo className="w-9 h-9 transition-transform duration-500 group-hover:-rotate-6" />
          <span className="font-display text-[26px] leading-none text-ink pt-1">نیلی</span>
          <span className="hidden sm:block text-[10px] text-ink3 tracking-[0.22em] border-r border-line pr-2.5 mr-0.5 leading-tight pt-0.5">
            برشته‌کاری قهوه
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-ink2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-sweep hover:text-nili transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#subscribe"
            className="hidden md:inline-flex items-center gap-2 bg-nili text-paper text-[13px] font-semibold px-4.5 py-2.5 rounded-full hover:bg-nili-deep active:scale-95 transition-all duration-300"
          >
            <Steam className="w-4 h-4" />
            اشتراک قهوه
          </a>
          <button
            onClick={onCartOpen}
            aria-label="باز کردن سبد خرید"
            className="relative p-2.5 rounded-full border border-line hover:border-nili hover:text-nili transition-colors active:scale-90"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="pop absolute -top-1 -left-1 min-w-5 h-5 px-1 rounded-full bg-amber text-ink text-[11px] font-bold flex items-center justify-center"
              >
                {fa(cartCount)}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label="منو"
            className="lg:hidden p-2.5 rounded-full border border-line active:scale-90 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h10M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          menu ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 pb-5 pt-1 flex flex-col gap-1 bg-paper">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              className="py-2.5 border-b border-line/60 last:border-0 flex items-center justify-between text-[15px] font-medium hover:text-nili hover:pr-2 transition-all"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {n.label}
              <ArrowLeft className="w-4 h-4 text-ink3" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ============ cart drawer ============ */
export interface CartLine {
  id: string;
  name: string;
  meta: string;
  price: number;
  qty: number;
  image?: string;
}

export function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  onRemove,
  onCheckout,
  ordered,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onQty: (id: string, d: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  ordered: string | null;
}) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const FREE_AT = 800000;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-ink/45 transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-full max-w-md bg-card border-e border-line flex flex-col transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="سبد خرید"
      >
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-line shrink-0">
          <h2 className="font-display text-2xl pt-1">
            سبد شما <span className="text-ink3 text-base">({fa(lines.reduce((s, l) => s + l.qty, 0))})</span>
          </h2>
          <button onClick={onClose} aria-label="بستن" className="p-2 rounded-full border border-line hover:rotate-90 hover:border-nili hover:text-nili transition-all duration-300 active:scale-90">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {ordered ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
            <span className="w-16 h-16 rounded-full bg-leaf/10 text-leaf flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5 9.5 18 20 6.5" />
              </svg>
            </span>
            <div>
              <p className="font-display text-3xl pt-1">سفارش ثبت شد!</p>
              <p className="text-ink2 text-sm mt-2 leading-7">
                کد پیگیری <b className="text-nili">{ordered}</b> — قهوه‌های شما پنجشنبهٔ آینده، همان روز برشت، راهی می‌شوند.
              </p>
            </div>
            <button onClick={onClose} className="mt-2 text-[13px] font-semibold border border-line rounded-full px-6 py-2.5 hover:border-nili hover:text-nili transition-colors">
              بازگشت به فروشگاه
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="text-ink3">
              <Steam className="w-12 h-12" />
            </span>
            <p className="font-display text-2xl pt-1">سبدتان خالی است</p>
            <p className="text-ink2 text-sm leading-7">هنوز قهوه‌ای انتخاب نکرده‌اید؛ برشت تازهٔ این هفته منتظر شماست.</p>
            <a href="#shop" onClick={onClose} className="mt-1 inline-flex items-center gap-2 bg-ink text-paper rounded-full px-6 py-3 text-[13px] font-semibold hover:bg-nili transition-colors">
              دیدن فروشگاه
              <ArrowLeft />
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-4 border-b border-line/70 pb-4 last:border-0">
                  {l.image ? (
                    <img src={l.image} alt={l.name} className="w-16 h-20 object-cover rounded-lg bg-paper2" loading="lazy" />
                  ) : (
                    <div className="w-16 h-20 rounded-lg bg-nili-soft text-nili flex items-center justify-center">
                      <BottleLogo className="w-8 h-8" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-[14px] truncate">{l.name}</p>
                      <button onClick={() => onRemove(l.id)} aria-label={`حذف ${l.name}`} className="text-ink3 hover:text-amber transition-colors shrink-0">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                          <path d="M5 7h14M10 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2m3 0-.8 12a2 2 0 0 1-2 1.9H9.8a2 2 0 0 1-2-1.9L7 7" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[11.5px] text-ink3 mt-0.5">{l.meta}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-line rounded-full overflow-hidden">
                        <button onClick={() => onQty(l.id, 1)} className="px-3 py-1 text-[15px] hover:bg-nili hover:text-paper transition-colors" aria-label="افزایش">+</button>
                        <span className="px-2 text-[13px] font-semibold min-w-6 text-center">{fa(l.qty)}</span>
                        <button
                          onClick={() => onQty(l.id, -1)}
                          className="px-3 py-1 text-[15px] hover:bg-nili hover:text-paper transition-colors disabled:opacity-30"
                          aria-label="کاهش"
                        >
                          −
                        </button>
                      </div>
                      <p className="text-[13px] font-bold">{money(l.price * l.qty)} <span className="font-normal text-ink3 text-[11px]">تومان</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 border-t border-line px-6 py-5 bg-paper space-y-4">
              {total < FREE_AT && (
                <div className="text-[12px] text-ink2 space-y-1.5">
                  <p>
                    تا ارسال رایگان: <b className="text-nili">{money(FREE_AT - total)}</b> تومان دیگر
                  </p>
                  <div className="h-1.5 bg-paper2 rounded-full overflow-hidden">
                    <div className="h-full bg-nili rounded-full transition-[width] duration-700 ease-out" style={{ width: `${Math.min(100, (total / FREE_AT) * 100)}%` }} />
                  </div>
                </div>
              )}
              {total >= FREE_AT && (
                <p className="text-[12px] text-leaf font-semibold flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
                  ارسال سفارش شما رایگان شد
                </p>
              )}
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] text-ink2">جمع سبد</span>
                <span className="font-display text-2xl pt-0.5">
                  {money(total)} <span className="text-[12px] font-body font-normal text-ink3">تومان</span>
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-nili text-paper rounded-full py-3.5 text-[14px] font-bold hover:bg-nili-deep active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                ثبت سفارش و پرداخت
                <ArrowLeft className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-ink3">پرداخت امن · ضمانت برشت تازه · بازگشت تا ۷ روز</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ============ toast ============ */
export function Toast({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return (
    <div className="toast-in fixed bottom-6 right-1/2 translate-x-1/2 z-[80] bg-ink text-paper rounded-full px-5 py-3 text-[13px] font-semibold flex items-center gap-2.5 shadow-[0_16px_40px_-12px_rgba(27,21,13,0.5)]">
      <span className="w-5 h-5 rounded-full bg-leaf text-paper flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
      </span>
      {msg}
    </div>
  );
}

/* ============ footer ============ */
export function Footer() {
  return (
    <footer className="bg-ink text-paper mt-28 relative overflow-hidden">
      <p aria-hidden="true" className="absolute -bottom-10 right-0 left-0 text-center font-display text-[26vw] leading-none text-paper/[0.04] select-none pointer-events-none">
        نیلی
      </p>
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8 relative">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-nili-soft">
              <BottleLogo className="w-9 h-9" />
              <span className="font-display text-[26px] text-paper pt-1">نیلی</span>
            </div>
            <p className="text-[13px] leading-7 text-paper/70 max-w-xs">
              برشته‌کاری مستقل قهوه از ۱۳۹۹؛ دانهٔ تازه، خرید مستقیم از مزرعه و باری که در آن هیچ فنجان بی‌حوصله‌ای دم نمی‌شود.
            </p>
            <div className="flex gap-2.5 pt-1">
              {[
                { label: "اینستاگرام", d: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm4 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zM17.4 6.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z" },
                { label: "تلگرام", d: "m21 4.5-3.1 14.6c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L17.5 6c.4-.3-.1-.5-.6-.2L6.4 12.5 1.8 11c-1-.3-1-1 .2-1.5L19.6 3c.8-.3 1.6.2 1.4 1.5z" },
                { label: "یوتیوب", d: "M22 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C18.2 4.8 12 4.8 12 4.8s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7C2 8.6 2 12 2 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-5 .4-5zM10 9l5 3-5 3V9z" },
              ].map((s) => (
                <a key={s.label} href="#top" aria-label={s.label} className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center text-paper/70 hover:bg-nili hover:border-nili hover:text-paper transition-all duration-300 hover:-translate-y-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[12px] tracking-[0.2em] text-paper/45 mb-4">فروشگاه</h4>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              {["دانهٔ تک‌خاستگاه", "بلندهای خانگی", "دم‌سرد", "کیت و ابزار", "کارت هدیه"].map((x) => (
                <li key={x}><a href="#shop" className="hover:text-nili-soft link-sweep transition-colors">{x}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[12px] tracking-[0.2em] text-paper/45 mb-4">شرکت</h4>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              {[["داستان ما", "#story"], ["کافه‌ها", "#cafes"], ["ژورنال", "#journal"], ["آکادمی نیلی", "#story"], ["فرصت‌های شغلی", "#story"]].map(([x, h]) => (
                <li key={x}><a href={h} className="hover:text-nili-soft link-sweep transition-colors">{x}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[12px] tracking-[0.2em] text-paper/45 mb-4">پشتیبانی</h4>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              {["پیگیری سفارش", "شرایط ارسال", "بازگشت کالا", "سوالات متداول", "تماس با ما"].map((x) => (
                <li key={x}><a href="#journal" className="hover:text-nili-soft link-sweep transition-colors">{x}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[12px] tracking-[0.2em] text-paper/45 mb-4">تماس</h4>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              <li dir="ltr" className="text-right">{fa("021-9109-4520")}</li>
              <li>hello@nili.coffee</li>
              <li>تهران، کارگاه مرکزی،<br />خیابان قزوین، کوچهٔ مهر، پلاک ۷</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/12 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-paper/45">
          <p>© {fa(1404)} برشته‌کاری نیلی — همهٔ حقوق محفوظ است.</p>
          <p className="flex items-center gap-1.5">
            دم‌شده با
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.5 8.6 2.4 5 6 5c2.2 0 3.6 1.2 6 3.8C14.4 6.2 15.8 5 18 5c3.6 0 5.5 3.6 4 6.7-2.5 4.6-10 9.3-10 9.3z" /></svg>
            و کمی کافئین اضافه
          </p>
        </div>
      </div>
    </footer>
  );
}
