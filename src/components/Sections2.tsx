import { useRef, useState } from "react";
import { BREWS, Brew, CAFES, fa, IMG, JOURNAL, TIMELINE } from "../data";
import { usePrefersReducedMotion } from "../hooks";

/* ============ story — sticky two-column ============ */
export function Story() {
  return (
    <section id="story" className="scroll-mt-24 max-w-7xl mx-auto px-5 md:px-8 pt-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* sticky column */}
        <div className="lg:sticky lg:top-28 self-start">
          <p className="rv text-[12px] font-bold tracking-[0.22em] text-nili mb-3">۰۳ — داستان ما</p>
          <h2 className="rv font-display text-4xl md:text-6xl leading-[1.15]" style={{ ["--d" as string]: "100ms" }}>
            از دانهٔ سبز تا
            <br />
            <span className="text-nili">فنجان شما،</span>
            <br />
            یک راست.
          </h2>
          <p className="rv text-ink2 text-[15px] leading-8 max-w-md mt-6" style={{ ["--d" as string]: "200ms" }}>
            نیلی یعنی رنگِ اعتماد؛ رنگی که روی لیبل همهٔ پاکت‌های ما هست. ما مزرعه‌ها را می‌شناسیم، با کشاورز قرارداد می‌بندیم، خودمان برشت می‌کنیم و خودمان دم می‌کنیم — تا هیچ حلقه‌ای از زنجیره گم نشود.
          </p>
          <div className="rv mt-9 grid grid-cols-2 gap-4 max-w-md" style={{ ["--d" as string]: "300ms" }}>
            <div className="border border-line rounded-2xl p-5 bg-card hover:border-nili/50 transition-colors duration-300">
              <p className="font-display text-3xl text-nili">۹۶ ساعت</p>
              <p className="text-[12px] text-ink3 mt-1.5 leading-6">از لحظهٔ برشت تا رسیدن به آدرس شما در تهران</p>
            </div>
            <div className="border border-line rounded-2xl p-5 bg-card hover:border-nili/50 transition-colors duration-300">
              <p className="font-display text-3xl text-nili">۲.۴×</p>
              <p className="text-[12px] text-ink3 mt-1.5 leading-6">میانگین قیمت خرید ما نسبت به نرخ بورس کالا</p>
            </div>
          </div>
          <div className="rv mt-10 overflow-hidden rounded-2xl border border-line group max-w-md" style={{ ["--d" as string]: "380ms" }}>
            <img src={IMG.roastery} alt="دستگاه برشت قهوه در کارگاه نیلی" loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" />
            <p className="bg-card px-4 py-3 text-[12px] text-ink3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              کارگاه مرکزی — پنجشنبه‌ها، روز برشت
            </p>
          </div>
        </div>

        {/* scrolling column */}
        <div className="space-y-16">
          {TIMELINE.map((t, i) => (
            <article key={t.year} className="rv relative border-r-2 border-line pr-8 md:pr-10 pb-2" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <span className="absolute -right-[9px] top-2 w-4 h-4 rounded-full bg-nili ring-4 ring-paper" />
              <p className="font-display text-5xl md:text-6xl text-ink/15 leading-none">{t.year}</p>
              <h3 className="font-display text-2xl md:text-3xl mt-2 hover:text-nili transition-colors duration-300 cursor-default">{t.title}</h3>
              <p className="text-ink2 text-[14.5px] leading-8 mt-2.5 max-w-md">{t.body}</p>
            </article>
          ))}

          <blockquote className="rv bg-ink text-paper rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-nili-soft/40 absolute top-6 left-6" fill="currentColor" aria-hidden="true">
              <path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H5v2h1a4 4 0 0 0 4-4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z" />
            </svg>
            <p className="font-display text-2xl md:text-[28px] leading-relaxed relative">
              قهوهٔ خوب نیاز به شعار ندارد؛ فقط به زمانِ درست، حرارتِ درست و آدمِ درست.
            </p>
            <footer className="mt-5 text-[12.5px] text-paper/60">
              — آرش نیلی، بنیان‌گذار و برشت‌کار ارشد
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ============ cafés — cursor-follow preview ============ */
export function Cafes() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <section id="cafes" className="scroll-mt-24 mt-24 bg-ink text-paper relative overflow-hidden">
      <p aria-hidden="true" className="absolute top-0 right-0 font-display text-[17vw] leading-none text-paper/[0.04] select-none pointer-events-none">
        کافه‌ها
      </p>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 relative" ref={boxRef} onMouseMove={onMove}>
        <div className="rv flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-bold tracking-[0.22em] text-amber mb-3">۰۴ — کافه‌های نیلی</p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              جایی برای یک <span className="text-amber">فنجان</span> آرام
            </h2>
          </div>
          <p className="text-paper/60 text-[13.5px] max-w-sm leading-7 border-r-2 border-amber pr-4">
            {fa(12)} کافه در {fa(5)} شهر. روی هر شعبه بروید تا گوشه‌ای از فضا را ببینید.
          </p>
        </div>

        <div className="mt-12 border-t border-paper/12">
          {CAFES.map((c, i) => (
            <a
              key={c.id}
              href="#cafes"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="rv group grid grid-cols-[auto_1fr_auto] md:grid-cols-12 items-center gap-x-5 gap-y-2 border-b border-paper/12 py-6 transition-colors duration-400 hover:bg-paper/[0.05] px-2 md:px-4 relative"
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <span className="font-display text-2xl text-paper/25 group-hover:text-amber transition-colors md:col-span-1 tabular-nums">
                {fa(String(i + 1).padStart(2, "0"))}
              </span>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl leading-none group-hover:-translate-x-2 transition-transform duration-400">
                  {c.name}
                </h3>
                <p className="text-[12px] text-paper/50 mt-2">{c.city}</p>
              </div>
              <div className="hidden md:block md:col-span-3 text-[12.5px] text-paper/60 leading-6">{c.address}</div>
              <div className="hidden md:block md:col-span-2 text-[12.5px] text-paper/60">
                <p>{c.hours}</p>
                <p className="text-paper/40 mt-0.5">{c.phone}</p>
              </div>
              <div className="md:col-span-2 flex md:justify-end gap-1.5 flex-wrap">
                {c.features.map((f) => (
                  <span key={f} className="text-[10.5px] border border-paper/20 rounded-full px-2.5 py-1 text-paper/60 group-hover:border-amber/50 group-hover:text-amber transition-colors duration-400">
                    {f}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* floating preview image */}
        {hover !== null && !reduced && (
          <div
            className="pointer-events-none absolute z-20 hidden lg:block w-56 h-40 rounded-xl overflow-hidden border-4 border-paper/20 shadow-2xl transition-opacity duration-200"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-115%, -50%) rotate(-4deg)",
              opacity: 1,
            }}
          >
            <img src={CAFES[hover].image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ============ brew guide ============ */
function BrewIcon({ kind, className = "w-8 h-8" }: { kind: Brew["icon"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "v60":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common} aria-hidden="true">
          <path d="M6 8h20l-7.5 10h-5L6 8z" />
          <path d="M13.5 21.5h5L17 25h-2l-1.5-3.5z" />
          <path d="M10 28h12" />
          <path d="M11 5.5c1-1 2 1 3 0s2 1 3 0 2 1 3 0" opacity="0.55" />
        </svg>
      );
    case "chemex":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common} aria-hidden="true">
          <path d="M11 4h10l-3.5 9 5.5 12a2 2 0 0 1-1.8 2.8H10.8A2 2 0 0 1 9 25l5.5-12L11 4z" />
          <path d="M12.5 16h7" />
          <path d="M13 13.2h6" opacity="0.55" />
        </svg>
      );
    case "press":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common} aria-hidden="true">
          <rect x="8" y="10" width="16" height="18" rx="2" />
          <path d="M16 10V5m-4 0h8" />
          <path d="M8 17h16" opacity="0.55" />
          <path d="M11 22.5h10" opacity="0.35" />
        </svg>
      );
    case "cold":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common} aria-hidden="true">
          <rect x="11" y="8" width="10" height="20" rx="3.5" />
          <path d="M13 8V5.5A1.5 1.5 0 0 1 14.5 4h3A1.5 1.5 0 0 1 19 5.5V8" />
          <path d="M11 15h10" opacity="0.55" />
          <circle cx="15" cy="21" r="1" opacity="0.55" />
          <circle cx="18" cy="24" r="0.8" opacity="0.55" />
        </svg>
      );
  }
}

export function BrewGuide() {
  const [active, setActive] = useState(0);
  const brew = BREWS[active];

  return (
    <section id="brew" className="scroll-mt-24 max-w-7xl mx-auto px-5 md:px-8 pt-24">
      <div className="rv flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] text-nili mb-3">۰۵ — راهنمای دم‌آوری</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            دم کنید، <span className="text-nili">درست</span>
          </h2>
        </div>
        <p className="text-ink2 text-[14px] leading-7 max-w-sm border-r-2 border-amber pr-4">
          دستورهای رسمی بار نیلی؛ همان نسبت‌ها و زمان‌هایی که باریستاهای ما هر صبح استفاده می‌کنند.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mt-10">
        {/* method tabs */}
        <div className="lg:col-span-4 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-1">
          {BREWS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setActive(i)}
              className={`rv flex items-center gap-4 rounded-2xl border px-5 py-4 text-right transition-all duration-400 shrink-0 lg:shrink min-w-44 lg:min-w-0 ${
                i === active
                  ? "bg-ink text-paper border-ink shadow-[0_20px_40px_-20px_rgba(27,21,13,0.6)] lg:translate-x-[-6px]"
                  : "bg-card border-line text-ink2 hover:border-ink/30"
              }`}
              style={{ ["--d" as string]: `${i * 80}ms` }}
            >
              <span className={i === active ? "text-amber" : "text-nili"}>
                <BrewIcon kind={b.icon} className="w-9 h-9" />
              </span>
              <span>
                <span className="font-display text-xl block leading-none pt-0.5">{b.name}</span>
                <span className={`text-[11.5px] mt-1.5 block ${i === active ? "text-paper/60" : "text-ink3"}`}>
                  نسبت {b.ratio} · {b.time} دقیقه
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* steps */}
        <div key={brew.id} className="lg:col-span-8 bg-card border border-line rounded-2xl p-7 md:p-10 relative overflow-hidden">
          <span aria-hidden="true" className="absolute -top-8 -left-4 font-display text-[150px] leading-none text-ink/[0.05] select-none">
            {fa(active + 1)}
          </span>
          <div className="grid sm:grid-cols-4 gap-4 relative">
            {[
              ["نسبت قهوه به آب", brew.ratio],
              ["دمای آب", brew.temp],
              ["زمان کل", `${brew.time} دقیقه`],
              ["درجهٔ آسیاب", brew.grind],
            ].map(([l, v]) => (
              <div key={l} className="bg-paper border border-line rounded-xl px-4 py-3.5">
                <p className="text-[10.5px] text-ink3 tracking-wide">{l}</p>
                <p className="font-display text-xl md:text-2xl text-nili mt-1">{v}</p>
              </div>
            ))}
          </div>

          <ol className="mt-8 space-y-5 relative">
            {brew.steps.map((s, i) => (
              <li key={s.title} className="rv on lm">
                <span className="flex gap-5 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-nili-soft text-nili-deep font-display text-lg flex items-center justify-center pt-0.5 border border-nili/15">
                    {fa(i + 1)}
                  </span>
                  <span className="pt-0.5">
                    <h4 className="font-bold text-[15.5px]">{s.title}</h4>
                    <p className="text-ink2 text-[13.5px] leading-7 mt-1 max-w-xl">{s.body}</p>
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 pt-6 border-t border-dashed border-line flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-ink2">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-leaf" />
              نکتهٔ برشت‌کار: آب را ۳۰ ثانیه بعد از جوش استفاده کنید.
            </p>
            <a href="#shop" className="link-sweep font-bold text-nili">
              خرید دانهٔ مناسب این روش ←
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ journal ============ */
export function Journal() {
  return (
    <section id="journal" className="scroll-mt-24 max-w-7xl mx-auto px-5 md:px-8 pt-24">
      <div className="rv flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] text-nili mb-3">۰۶ — ژورنال نیلی</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            یادداشت‌هایی از <span className="text-nili">بار</span>
          </h2>
        </div>
        <a href="#journal" onClick={(e) => e.preventDefault()} className="link-sweep text-[13.5px] font-bold text-nili">
          همهٔ نوشته‌ها ←
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {JOURNAL.map((j, i) => (
          <article
            key={j.id}
            className="rv group cursor-pointer"
            style={{ ["--d" as string]: `${i * 100}ms` }}
          >
            <div className="overflow-hidden rounded-2xl border border-line">
              <img
                src={j.image}
                alt={j.title}
                loading="lazy"
                className="w-full aspect-[16/11] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
            </div>
            <div className="flex items-center gap-3 mt-4 text-[11.5px] text-ink3">
              <span className="bg-nili-soft text-nili-deep font-bold rounded-full px-3 py-1">{j.category}</span>
              <span>{j.date}</span>
              <span>·</span>
              <span>{j.read} مطالعه</span>
            </div>
            <h3 className="font-display text-2xl leading-snug mt-2.5 group-hover:text-nili transition-colors duration-300">
              {j.title}
            </h3>
            <p className="text-ink2 text-[13.5px] leading-7 mt-2">{j.excerpt}</p>
            <span className="inline-flex items-center gap-2 mt-3.5 text-[13px] font-bold text-ink link-sweep group-hover:text-nili transition-colors">
              خواندن مطلب
              <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ newsletter ============ */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "ok">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("ok");
  };

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24">
      <div className="rv bg-nili text-paper rounded-3xl relative overflow-hidden px-7 py-12 md:p-14">
        <svg aria-hidden="true" className="absolute -bottom-10 -left-10 w-56 h-56 text-paper/10" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20 15h40a20 20 0 0 1 0 40h-8l-4 30H30l-10-70z" />
        </svg>
        <svg aria-hidden="true" className="absolute -top-14 -right-10 w-64 h-64 text-nili-deep/60" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[12px] font-bold tracking-[0.22em] text-paper/70 mb-3">نامهٔ نیلی</p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              هر پنجشنبه، خبرِ برشتِ تازه در صندوق شما.
            </h2>
            <p className="text-paper/75 text-[14px] leading-7 mt-3 max-w-md">
              برنامهٔ برشت هفته، تک‌خاستگاه‌های محدود و یک دستور دم — هفته‌ای یک ایمیل، بدون اضافات.
            </p>
          </div>
          <form onSubmit={submit} className="w-full" noValidate>
            <div className={`flex flex-col sm:flex-row gap-2.5 bg-paper rounded-2xl p-2.5 transition-shadow duration-300 ${state === "error" ? "ring-2 ring-amber" : ""}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state !== "idle") setState("idle");
                }}
                placeholder="ایمیل شما…"
                dir="ltr"
                className="flex-1 bg-transparent px-4 py-3 text-[14px] text-ink placeholder:text-ink3 outline-none text-left"
                aria-label="ایمیل"
              />
              <button
                type="submit"
                className="bg-ink text-paper rounded-xl px-7 py-3 text-[13.5px] font-bold hover:bg-ink/85 active:scale-95 transition-all duration-300"
              >
                عضویت
              </button>
            </div>
            <p className={`mt-3 text-[12.5px] h-5 transition-colors ${state === "error" ? "text-amber" : state === "ok" ? "text-paper" : "text-paper/55"}`}>
              {state === "error"
                ? "ایمیل واردشده درست نیست؛ دوباره تلاش کنید."
                : state === "ok"
                  ? "✓ خوش آمدید! اولین نامه پنجشنبهٔ آینده می‌رسد."
                  : "با عضویت، شرایط دریافت نامهٔ هفتگی را می‌پذیرید."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
