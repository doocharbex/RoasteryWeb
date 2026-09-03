import { useMemo, useState } from "react";
import {
  CATEGORIES,
  Category,
  fa,
  IMG,
  money,
  Product,
  PRODUCTS,
  STATS,
  SUB_BEANS,
  SUB_FREQS,
  SUB_WEIGHTS,
} from "../data";
import { lastRoastLabel, msUntilRoast, useCountUp, useInView, useNow } from "../hooks";

/* ============ rotating stamp ============ */
export function Stamp({ size = 116, text, className = "" }: { size?: number; text: string; className?: string }) {
  return (
    <div className={`spin-slow ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="stampCircle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill="var(--color-nili)" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-paper)" strokeWidth="0.8" className="ring-dashed" />
        <text fontSize="9.5" fill="var(--color-paper)" letterSpacing="2.2" fontWeight="600">
          <textPath href="#stampCircle">{text}</textPath>
        </text>
        <g transform="translate(50 50)">
          <path d="M-9 6 L0 -14 L9 6 L0 0 Z" fill="var(--color-paper)" />
        </g>
      </svg>
    </div>
  );
}

/* ============ hero ============ */
export function Hero() {
  const now = useNow(1000);
  const ms = msUntilRoast(now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);

  const cells: [string, string][] = [
    [fa(d), "روز"],
    [fa(String(h).padStart(2, "0")), "ساعت"],
    [fa(String(m).padStart(2, "0")), "دقیقه"],
    [fa(String(s).padStart(2, "0")), "ثانیه"],
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* faint oversized background word */}
      <p aria-hidden="true" className="absolute top-6 left-0 font-display text-[24vw] leading-none text-ink/[0.045] select-none pointer-events-none whitespace-nowrap">
        برشت تازه
      </p>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* copy — right (start) column */}
        <div className="lg:col-span-6 relative z-10">
          <div className="lm rv on" style={{ ["--d" as string]: "80ms" }}>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-nili bg-nili-soft/70 border border-nili/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-nili animate-pulse" />
              آخرین برشت: پنجشنبه {fa(lastRoastLabel(now))}
            </span>
          </div>

          <h1 className="font-display text-ink leading-[1.05] text-[13.5vw] sm:text-6xl md:text-7xl xl:text-[86px] mt-6">
            <span className="lm" style={{ ["--d" as string]: "150ms" }}>
              <span>قهوه،</span>
            </span>
            <span className="lm" style={{ ["--d" as string]: "300ms" }}>
              <span className="text-nili">تازه‌برشت،</span>
            </span>
            <span className="lm" style={{ ["--d" as string]: "450ms" }}>
              <span>
                بی‌ادعا.
                <svg viewBox="0 0 120 14" className="inline-block w-[1em] h-[0.16em] text-amber mr-2 -mb-1" aria-hidden="true">
                  <path d="M3 10 C 30 3, 85 2, 117 7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>

          <p className="rv text-ink2 text-[15.5px] md:text-[16.5px] leading-8 max-w-lg mt-7" style={{ ["--d" as string]: "550ms" }}>
            ما هر پنجشنبه فقط به اندازهٔ سفارش‌های همان هفته برشت می‌کنیم؛ پاکت شما حداکثر ده روز بعد از خروج از دستگاه، به درِ خانه می‌رسد. از ۹ مزرعهٔ همکار، مستقیم و بی‌واسطه.
          </p>

          <div className="rv flex flex-wrap items-center gap-3.5 mt-8" style={{ ["--d" as string]: "650ms" }}>
            <a href="#shop" className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-5 py-3.5 text-[14px] font-bold hover:bg-nili transition-colors duration-300 active:scale-95">
              خرید برشت این هفته
              <span className="w-7 h-7 rounded-full bg-paper/15 group-hover:bg-paper/25 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
              </span>
            </a>
            <a href="#subscribe" className="inline-flex items-center gap-2 border border-ink/25 rounded-full px-6 py-3.5 text-[14px] font-semibold hover:border-nili hover:text-nili transition-colors active:scale-95">
              شروع اشتراک — ۱۵٪ تخفیف
            </a>
          </div>

          {/* roast countdown */}
          <div className="rv mt-10 max-w-lg border border-line bg-card rounded-2xl p-5 flex items-center gap-5" style={{ ["--d" as string]: "750ms" }}>
            <div className="shrink-0 text-nili">
              <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <circle cx="24" cy="26" r="16" />
                <path d="M24 26V17m0 0-6 6m6-6 6 6" transform="rotate(180 24 21.5)" />
                <path d="M18 5h12" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[11.5px] tracking-[0.18em] text-ink3 mb-2">تا برشت بعدی — پنجشنبه ساعت ۹ صبح</p>
              <div className="grid grid-cols-4 gap-2" dir="ltr">
                {cells.map(([v, l]) => (
                  <div key={l} className="text-center bg-paper border border-line rounded-xl py-2">
                    <p className="font-display text-2xl leading-none text-ink tabular-nums">{v}</p>
                    <p className="text-[10.5px] text-ink3 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* image — left (end) column */}
        <div className="lg:col-span-6 relative">
          <div className="rv relative max-w-[460px] mx-auto lg:ml-0 lg:mr-auto" style={{ ["--d" as string]: "300ms" }}>
            <div className="arch overflow-hidden border-[10px] border-card shadow-[0_40px_80px_-40px_rgba(27,21,13,0.45)]">
              <img src={IMG.hero} alt="دم‌آوری قهوهٔ تازه با کمکس" className="kenburns w-full aspect-[10/12.5] object-cover" />
            </div>
            <Stamp text="برشت تازه • هر پنجشنبه • نیلی • برشت تازه • " size={112} className="absolute -bottom-8 -right-4 md:-right-10 drop-shadow-xl" />
            <div className="absolute top-8 -left-3 md:-left-8 bg-card border border-line rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-leaf/12 text-leaf flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3c4 4.5 7 7.6 7 11a7 7 0 1 1-14 0c0-3.4 3-6.5 7-11z" />
                  <path d="M12 17v-4" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-bold leading-none">یرگاچف اتیوپی</p>
                <p className="text-[11px] text-ink3 mt-1">یاس · ترنج · عسل</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ stats band ============ */
function StatCell({ value, label, plain, started }: { value: number; label: string; plain?: boolean; started: boolean }) {
  const v = useCountUp(value, started, 1800);
  return (
    <div className="text-center py-8 px-4 group">
      <p className="font-display text-4xl md:text-5xl text-paper tabular-nums transition-colors duration-500 group-hover:text-amber">
        {plain ? fa(v) : fa(v.toLocaleString("en-US")).replace(/,/g, "٬")}
        {!plain && <span className="text-amber text-2xl">+</span>}
      </p>
      <p className="text-[12.5px] text-paper/60 mt-2 tracking-wide">{label}</p>
    </div>
  );
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-paper/10" />
        <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full border border-paper/10" />
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-paper/10 relative">
        {STATS.map((s) => (
          <StatCell key={s.label} value={s.value} label={s.label} plain={s.plain} started={inView} />
        ))}
      </div>
    </div>
  );
}

/* ============ shop ============ */
export function Shop({ onAdd }: { onAdd: (p: Product) => void }) {
  const [cat, setCat] = useState<Category | "all">("all");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const list = useMemo(() => (cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)), [cat]);

  const add = (p: Product) => {
    onAdd(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded((c) => (c === p.id ? null : c)), 1400);
  };

  return (
    <section id="shop" className="scroll-mt-24 max-w-7xl mx-auto px-5 md:px-8 pt-24">
      <div className="rv flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] text-nili mb-3">۰۱ — فروشگاه</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            برشتِ این <span className="text-nili">هفته</span>
          </h2>
        </div>
        <p className="rv text-ink2 text-[14px] leading-7 max-w-sm border-r-2 border-amber pr-4" style={{ ["--d" as string]: "150ms" }}>
          همهٔ دانه‌ها پنجشنبه برشت می‌شوند و همان هفته ارسال؛ تاریخ برشت روی هر پاکت درج شده است.
        </p>
      </div>

      {/* category tabs */}
      <div className="rv flex flex-wrap gap-2 mt-9" style={{ ["--d" as string]: "200ms" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full px-5 py-2.5 text-[13px] font-semibold border transition-all duration-300 active:scale-95 ${
              cat === c.id
                ? "bg-ink text-paper border-ink shadow-[0_10px_24px_-12px_rgba(27,21,13,0.6)]"
                : "bg-card border-line text-ink2 hover:border-ink/40 hover:-translate-y-0.5"
            }`}
          >
            {c.label}
            <span className={`mr-1.5 text-[11px] ${cat === c.id ? "text-paper/60" : "text-ink3"}`}>
              {fa(c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length)}
            </span>
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-8">
        {list.map((p, i) => (
          <article
            key={p.id}
            className="rv group bg-card border border-line rounded-2xl overflow-hidden hover:border-nili/50 hover:shadow-[0_30px_60px_-30px_rgba(28,79,216,0.35)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
            style={{ ["--d" as string]: `${i * 90}ms` }}
          >
            <div className="relative overflow-hidden bg-paper2">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full aspect-[9/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
              {p.tag && (
                <span className="absolute top-4 right-4 bg-nili text-paper text-[11px] font-bold rounded-full px-3.5 py-1.5 shadow-md">
                  {p.tag}
                </span>
              )}
              <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-ink text-[11px] font-semibold rounded-full px-3 py-1.5 border border-line">
                برشت {p.roast}
              </span>
              {/* quick add slides up */}
              <button
                onClick={() => add(p)}
                className={`absolute inset-x-4 bottom-4 rounded-xl py-3 text-[13.5px] font-bold transition-all duration-400 active:scale-95 ${
                  justAdded === p.id
                    ? "bg-leaf text-paper translate-y-0"
                    : "bg-ink text-paper translate-y-[130%] group-hover:translate-y-0 hover:bg-nili"
                }`}
              >
                {justAdded === p.id ? "✓ به سبد اضافه شد" : "افزودن سریع به سبد"}
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-[22px] leading-snug pt-0.5 group-hover:text-nili transition-colors">{p.name}</h3>
                  <p className="text-[12px] text-ink3 mt-1">{p.origin} · {p.weight}</p>
                </div>
                <p className="text-left shrink-0">
                  <span className="font-display text-xl block leading-none">{money(p.price)}</span>
                  <span className="text-[10.5px] text-ink3">تومان</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3.5 mb-4">
                {p.notes.map((n) => (
                  <span key={n} className="text-[11px] text-ink2 bg-paper border border-line rounded-full px-2.5 py-1">
                    {n}
                  </span>
                ))}
              </div>
              <button
                onClick={() => add(p)}
                className="mt-auto w-full border border-ink/20 rounded-xl py-2.5 text-[13px] font-bold hover:bg-ink hover:text-paper transition-colors duration-300 active:scale-[0.98]"
              >
                افزودن به سبد
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ subscription ============ */
export function Subscription({ onAddSub }: { onAddSub: (name: string, meta: string, price: number) => void }) {
  const [bean, setBean] = useState(0);
  const [weight, setWeight] = useState(0);
  const [freq, setFreq] = useState(1);

  const b = SUB_BEANS[bean];
  const w = SUB_WEIGHTS[weight];
  const f = SUB_FREQS[freq];
  const raw = Math.round((b.base * w.mult) / 1000) * 1000;
  const final = Math.round((raw * (1 - f.off)) / 1000) * 1000;
  const save = raw - final;

  const pick = (base: string, i: number, cur: number, set: (n: number) => void, label: string) =>
    `rounded-xl border px-4 py-3 text-[13px] font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
      cur === i
        ? "border-nili bg-nili-soft/70 text-nili-deep shadow-[inset_0_0_0_1px_var(--color-nili)]"
        : "border-line bg-card text-ink2 hover:border-ink/40"
    } ${base}`;

  const seg = (base: string) => `${base} flex flex-wrap gap-2`;

  return (
    <section id="subscribe" className="scroll-mt-24 mt-24 bg-paper2 relative overflow-hidden">
      <p aria-hidden="true" className="absolute -top-4 left-4 font-display text-[18vw] leading-none text-ink/[0.04] select-none pointer-events-none">
        اشتراک
      </p>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative">
        {/* image side */}
        <div className="rv relative order-2 lg:order-1">
          <div className="arch overflow-hidden border-[10px] border-card shadow-[0_40px_80px_-40px_rgba(27,21,13,0.4)] max-w-[440px]">
            <img src={IMG.bean1} alt="بستهٔ اشتراک قهوهٔ نیلی" className="kenburns w-full aspect-[9/10.5] object-cover" />
          </div>
          <div className="absolute top-6 -left-2 md:left-0 bg-card border border-line rounded-xl px-4 py-3 shadow-lg rotate-[-3deg]">
            <p className="font-display text-xl text-nili leading-none">۱۵٪−</p>
            <p className="text-[10.5px] text-ink3 mt-1">تخفیف تحویل هفتگی</p>
          </div>
          <div className="absolute bottom-10 -right-2 md:-right-6 bg-ink text-paper rounded-xl px-4 py-3 shadow-lg rotate-[2.5deg] flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <rect x="3.5" y="8" width="17" height="12" rx="2.5" />
              <path d="M3.5 11.5h17M12 8V5.5m-5 2.5C7 5.5 8.5 4 10 4s2 1.5 2 4m0 0c0-2.5.5-4 2-4s3 1.5 3 4" />
            </svg>
            <div>
              <p className="text-[12.5px] font-bold leading-none">هدیهٔ اولین جعبه</p>
              <p className="text-[10.5px] text-paper/60 mt-1">فیلتر + راهنمای دم</p>
            </div>
          </div>
        </div>

        {/* configurator */}
        <div className="order-1 lg:order-2">
          <p className="rv text-[12px] font-bold tracking-[0.22em] text-nili mb-3">۰۲ — اشتراک ماهانه</p>
          <h2 className="rv font-display text-4xl md:text-6xl leading-tight" style={{ ["--d" as string]: "100ms" }}>
            قهوهٔ خانه‌تان،<br />
            <span className="text-nili">خودبه‌خود</span> تازه بماند.
          </h2>
          <p className="rv text-ink2 text-[15px] leading-8 max-w-md mt-5" style={{ ["--d" as string]: "200ms" }}>
            قهوه را انتخاب کنید؛ ما با هر برشت، سهم شما را جدا می‌کنیم و سرِ موعد به درِ خانه می‌فرستیم. هر وقت خواستید متوقف کنید — بدون جریمه.
          </p>

          <div className="rv mt-8 bg-card border border-line rounded-2xl p-6 space-y-6" style={{ ["--d" as string]: "300ms" }}>
            <div>
              <p className="text-[12px] font-bold tracking-[0.14em] text-ink3 mb-2.5">۱. قهوه</p>
              <div className={seg("")}>
                {SUB_BEANS.map((x, i) => (
                  <button key={x.id} onClick={() => setBean(i)} className={pick("flex-1 min-w-36", i, bean, setBean, x.label)}>
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold tracking-[0.14em] text-ink3 mb-2.5">۲. وزن هر بسته</p>
              <div className={seg("")}>
                {SUB_WEIGHTS.map((x, i) => (
                  <button key={x.id} onClick={() => setWeight(i)} className={pick("flex-1 min-w-28", i, weight, setWeight, x.label)}>
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold tracking-[0.14em] text-ink3 mb-2.5">۳. فاصلهٔ تحویل</p>
              <div className={seg("")}>
                {SUB_FREQS.map((x, i) => (
                  <button key={x.id} onClick={() => setFreq(i)} className={pick("flex-1 min-w-28", i, freq, setFreq, x.label)}>
                    {x.label}
                    <span className="block text-[10.5px] font-normal text-leaf mt-0.5">{fa(Math.round(x.off * 100))}٪ تخفیف</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-line pt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11.5px] text-ink3">هر تحویل ({w.label})</p>
                <p className="font-display text-3xl md:text-4xl leading-none mt-1.5 tabular-nums">
                  {money(final)} <span className="text-[13px] font-body font-normal text-ink3">تومان</span>
                </p>
                <p className="text-[11.5px] text-leaf font-semibold mt-1.5">
                  {money(save)} تومان در هر بسته صرفه‌جویی می‌کنید
                </p>
              </div>
              <button
                onClick={() => onAddSub(`اشتراک نیلی — ${b.label}`, `${w.label} · تحویل ${f.label}`, final)}
                className="bg-nili text-paper rounded-full px-7 py-3.5 text-[13.5px] font-bold hover:bg-nili-deep active:scale-95 transition-all duration-300 shadow-[0_14px_30px_-12px_rgba(28,79,216,0.7)]"
              >
                شروع اشتراک
              </button>
            </div>
          </div>

          <ul className="rv mt-6 grid sm:grid-cols-3 gap-3 text-[12px] text-ink2" style={{ ["--d" as string]: "400ms" }}>
            {["ارسال همیشه رایگان", "توقف یا تغییر با یک کلیک", "دسترسی زودهنگام به تک‌خاستگاه‌ها"].map((t) => (
              <li key={t} className="flex items-start gap-2 bg-card/60 border border-line rounded-xl px-3.5 py-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-nili shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
