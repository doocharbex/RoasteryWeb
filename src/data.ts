/* ---------- helpers ---------- */
const FA = "۰۱۲۳۴۵۶۷۸۹";
export const fa = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => FA[+d]);

export const money = (n: number): string =>
  fa(n.toLocaleString("en-US")).replace(/,/g, "٬");

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/cb8e77a9-0976-4a28-b778-98c51babc70e/_result.png",
  bean1:
    "https://image.qwenlm.ai/generated-images/bcb9b96d-9078-4392-9024-b33f35f71d0c/_result.png",
  bean2:
    "https://image.qwenlm.ai/generated-images/4655bdf5-3a3d-451e-9a42-df68ec84894f/_result.png",
  bean3:
    "https://image.qwenlm.ai/generated-images/e3f98584-1efc-477c-baa2-ab8a88cfd7c9/_result.png",
  cold: "https://image.qwenlm.ai/generated-images/48722cc9-86bc-4cd6-9d5b-6d22bb19a760/_result.png",
  kit: "https://image.qwenlm.ai/generated-images/07a3844b-a070-40fd-acae-040344927556/_result.png",
  mug: "https://image.qwenlm.ai/generated-images/cd1d2805-8377-4ad3-84ea-1bcfcdd4fdcc/_result.png",
  cafe: "https://image.qwenlm.ai/generated-images/995075b0-a7e9-4fcd-a8df-378d3fdd0fc2/_result.png",
  roastery:
    "https://image.qwenlm.ai/generated-images/80636614-f352-4d18-919f-9044d1f3e2e6/_result.png",
  journal:
    "https://image.qwenlm.ai/generated-images/3b6d1d68-5bec-479d-8881-0b5085573d20/_result.png",
};

/* ---------- shop ---------- */
export type Category = "beans" | "coldbrew" | "gear" | "merch";

export interface Product {
  id: string;
  name: string;
  origin: string;
  roast: "روشن" | "متوسط" | "تیره";
  price: number;
  weight: string;
  notes: string[];
  image: string;
  category: Category;
  tag?: string;
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "beans", label: "دانهٔ قهوه" },
  { id: "coldbrew", label: "دم‌سرد" },
  { id: "gear", label: "کیت و ابزار" },
  { id: "merch", label: "ماگ و لوازم" },
];

export const PRODUCTS: Product[] = [
  {
    id: "yirgacheffe",
    name: "تک‌خاستگاه یرگاچف",
    origin: "اتیوپی",
    roast: "روشن",
    price: 485000,
    weight: "۲۵۰ گرم",
    notes: ["یاس", "ترنج", "عسل"],
    image: IMG.bean1,
    category: "beans",
    tag: "برشت این هفته",
  },
  {
    id: "house-2",
    name: "بلند خانگی نیلی ۲",
    origin: "ترکیب دو مبدأ",
    roast: "متوسط",
    price: 435000,
    weight: "۲۵۰ گرم",
    notes: ["شکلات تلخ", "فندق", "شکر قهوه‌ای"],
    image: IMG.bean2,
    category: "beans",
  },
  {
    id: "midnight",
    name: "نیمه‌شب",
    origin: "برزیل و سوماترا",
    roast: "تیره",
    price: 415000,
    weight: "۲۵۰ گرم",
    notes: ["ملاس", "گردو", "کاکائو"],
    image: IMG.bean3,
    category: "beans",
    tag: "مناسب اسپرسو",
  },
  {
    id: "coldbrew",
    name: "کنسانترهٔ دم‌سرد",
    origin: "دم‌آوری ۱۶ ساعته",
    roast: "متوسط",
    price: 360000,
    weight: "۷۵۰ میلی‌لیتر",
    notes: ["کاکائو", "خرما", "بافت ابریشمی"],
    image: IMG.cold,
    category: "coldbrew",
  },
  {
    id: "travel-kit",
    name: "کیت سفری V60",
    origin: "سرامیک دست‌ساز",
    roast: "متوسط",
    price: 1850000,
    weight: "دریپر + فیلتر + آسیاب",
    notes: ["سبک", "قابل‌حمل", "فیلتر ۴۰ عددی"],
    image: IMG.kit,
    category: "gear",
    tag: "پرفروش",
  },
  {
    id: "mug",
    name: "ماگ سرامیکی نیلی",
    origin: "لعاب مات",
    roast: "متوسط",
    price: 520000,
    weight: "۳۰۰ میلی‌لیتر",
    notes: ["لعاب مات", "دست‌ساز", "قابل شست‌وشو"],
    image: IMG.mug,
    category: "merch",
  },
];

/* ---------- subscription ---------- */
export const SUB_BEANS = [
  { id: "yirg", label: "یرگاچف اتیوپی", base: 485000 },
  { id: "house", label: "بلند خانگی نیلی", base: 435000 },
  { id: "surprise", label: "انتخاب برشت‌کار", base: 395000 },
];

export const SUB_WEIGHTS = [
  { id: "250", label: "۲۵۰ گرم", mult: 1 },
  { id: "500", label: "۵۰۰ گرم", mult: 1.85 },
  { id: "1000", label: "یک کیلوگرم", mult: 3.4 },
];

export const SUB_FREQS = [
  { id: "weekly", label: "هر هفته", off: 0.15 },
  { id: "biweekly", label: "هر دو هفته", off: 0.12 },
  { id: "monthly", label: "هر ماه", off: 0.08 },
];

/* ---------- cafés ---------- */
export interface Cafe {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  features: string[];
  image: string;
}

export const CAFES: Cafe[] = [
  {
    id: "valiasr",
    name: "نیلی ولیعصر",
    city: "تهران",
    address: "خیابان ولیعصر، نرسیده به پارک‌وی، پلاک ۲۱۴۰",
    hours: "هر روز ۷:۳۰ تا ۲۲",
    phone: "۰۲۱-۲۲۶۶۸۱۴۰",
    features: ["بار دم دستی", "تراس"],
    image: IMG.cafe,
  },
  {
    id: "jordan",
    name: "نیلی جردن",
    city: "تهران",
    address: "بلوار نلسون ماندلا، کوچهٔ سایه، پلاک ۱۸",
    hours: "هر روز ۸ تا ۲۳",
    phone: "۰۲۱-۲۶۲۰۹۵۷۱",
    features: ["برشته‌کاری حضوری", "نشست تخصصی"],
    image: IMG.roastery,
  },
  {
    id: "chaharbagh",
    name: "نیلی چهارباغ",
    city: "اصفهان",
    address: "چهارباغ عباسی، روبه‌روی باغ هزارجریب",
    hours: "هر روز ۸ تا ۲۲",
    phone: "۰۳۱-۳۶۲۸۴۹۰۵",
    features: ["حیاط مرکزی", "بار اسپرسو"],
    image: IMG.cafe,
  },
  {
    id: "zand",
    name: "نیلی زند",
    city: "شیراز",
    address: "خیابان زند، تقاطع فلسطین، پلاک ۹۲",
    hours: "هر روز ۸ تا ۲۱:۳۰",
    phone: "۰۷۱-۳۲۳۳۷۶۱۸",
    features: ["صبحانهٔ کامل", "گالری کوچک"],
    image: IMG.journal,
  },
  {
    id: "ahmadabad",
    name: "نیلی احمدآباد",
    city: "مشهد",
    address: "بلوار احمدآباد، نبش خیابان رضا، پلاک ۵۷",
    hours: "هر روز ۷:۳۰ تا ۲۲",
    phone: "۰۵۱-۳۸۴۵۲۰۶۹",
    features: ["بار دم دستی", "فضای کار"],
    image: IMG.cafe,
  },
];

/* ---------- brew guide ---------- */
export interface Brew {
  id: string;
  name: string;
  ratio: string;
  temp: string;
  time: string;
  grind: string;
  steps: { title: string; body: string }[];
  icon: "v60" | "chemex" | "press" | "cold";
}

export const BREWS: Brew[] = [
  {
    id: "v60",
    name: "V60",
    ratio: "۱:۱۵",
    temp: "۹۲°",
    time: "۲:۴۵",
    grind: "متوسط رو به ریز",
    icon: "v60",
    steps: [
      {
        title: "آب‌کشی فیلتر",
        body: "فیلتر کاغذی را با آب داغ بشویید تا طعم کاغذ گرفته شود و ظرف گرم بماند.",
      },
      {
        title: "شکوفه‌دهی",
        body: "۴۰ گرم آب بریزید و ۳۵ ثانیه صبر کنید تا گاز قهوه آزاد شود و سطح پف کند.",
      },
      {
        title: "ریختن آرام",
        body: "بقیهٔ آب را در دو مرحله و با حرکت دایره‌ای از مرکز به بیرون اضافه کنید.",
      },
      {
        title: "زمان‌بندی",
        body: "کل فرایند باید حدود ۲ دقیقه و ۴۵ ثانیه طول بکشد؛ سریع‌تر شد، آسیاب را ریزتر کنید.",
      },
    ],
  },
  {
    id: "chemex",
    name: "کمکس",
    ratio: "۱:۱۶",
    temp: "۹۴°",
    time: "۴:۰۰",
    grind: "متوسط",
    icon: "chemex",
    steps: [
      {
        title: "فیلتر سه‌لایه",
        body: "سمت سه‌لایهٔ فیلتر را رو به دهانه قرار دهید و با آب داغ بشویید.",
      },
      {
        title: "شکوفه",
        body: "دو برابر وزن قهوه آب بریزید و ۴۰ ثانیه مکث کنید.",
      },
      {
        title: "پر کردن تدریجی",
        body: "آب را تا نیمه بریزید، صبر کنید پایین برود و دوباره تا لبه پر کنید.",
      },
      {
        title: "پایان تمیز",
        body: "وقتی سطح قهوه صاف شد، فیلتر را بردارید و فنجان اول را کمی هم بزنید.",
      },
    ],
  },
  {
    id: "press",
    name: "فرنچ‌پرس",
    ratio: "۱:۱۴",
    temp: "۹۳°",
    time: "۴:۰۰",
    grind: "درشت",
    icon: "press",
    steps: [
      {
        title: "قهوهٔ درشت",
        body: "دانه‌ها را درشت آسیاب کنید و کف ظرف بریزید؛ آب را تا لبه اضافه کنید.",
      },
      {
        title: "هم‌زدن اولیه",
        body: "بعد از یک دقیقه لایهٔ رویی را یک‌بار هم بزنید تا عصاره‌گیری یکنواخت شود.",
      },
      {
        title: "صبر",
        body: "درب را بگذارید اما پیستون را پایین نبرید؛ ۴ دقیقهٔ کامل صبر کنید.",
      },
      {
        title: "پایین‌آوردن آرام",
        body: "پیستون را آهسته تا نیمه پایین بیاورید و بلافاصله سرو کنید تا تلخ نشود.",
      },
    ],
  },
  {
    id: "cold",
    name: "دم‌سرد",
    ratio: "۱:۸",
    temp: "سرد",
    time: "۱۶ ساعت",
    grind: "خیلی درشت",
    icon: "cold",
    steps: [
      {
        title: "ترکیب",
        body: "قهوهٔ خیلی درشت را با آب سرد ترکیب کنید و در ظرف دربسته بریزید.",
      },
      {
        title: "استراحت",
        body: "ظرف را ۱۶ ساعت در یخچال بگذارید؛ تکان ندهید.",
      },
      {
        title: "صاف کردن",
        body: "از فیلتر کاغذی دوبار عبور دهید تا مایع کاملاً شفاف شود.",
      },
      {
        title: "رقیق‌سازی",
        body: "کنسانتره را هنگام سرو با آب یا شیر به نسبت دلخواه رقیق کنید.",
      },
    ],
  },
];

/* ---------- journal ---------- */
export const JOURNAL = [
  {
    id: "j1",
    category: "راهنما",
    title: "چطور لیبل قهوه را مثل یک حرفه‌ای بخوانیم؟",
    excerpt:
      "مبدأ، ارتفاع، فرایند و یادداشت چشایی — هر عدد روی پاکت قهوه داستانی دارد که طعم فنجان شما را از قبل لو می‌دهد.",
    date: "۱۲ آبان ۱۴۰۴",
    read: "۶ دقیقه",
    image: IMG.journal,
  },
  {
    id: "j2",
    category: "برشته‌کاری",
    title: "چرا برشت روشن؟ دفاعیه‌ای از شفافیت طعم",
    excerpt:
      "برشت روشن قهوه را ترش نمی‌کند؛ اگر درست انجام شود، فقط شخصیت مزرعه را بلندتر می‌گوید. پشت صحنهٔ دستگاه برشت نیلی.",
    date: "۲۸ مهر ۱۴۰۴",
    read: "۸ دقیقه",
    image: IMG.roastery,
  },
  {
    id: "j3",
    category: "کافه",
    title: "صبح‌های چهارباغ: دفترچهٔ یک کافهٔ تازه",
    excerpt:
      "از انتخاب لوکیشن تا طراحی بار دم دستی؛ روایت ساخت پنجمین کافهٔ نیلی در حیاط مرکزی یک خانهٔ قدیمی اصفهانی.",
    date: "۹ مهر ۱۴۰۴",
    read: "۵ دقیقه",
    image: IMG.cafe,
  },
];

/* ---------- story timeline ---------- */
export const TIMELINE = [
  {
    year: "۱۳۹۹",
    title: "یک دستگاه ۵ کیلویی",
    body: "همه‌چیز از یک برشت‌کن کوچک در یک زیرزمین اجاره‌ای شروع شد؛ هفته‌ای ۴۰ کیلو قهوه برای دوستان و همسایه‌ها.",
  },
  {
    year: "۱۴۰۰",
    title: "اولین کافهٔ ولیعصر",
    body: "باری به وسعت شش صندلی؛ منوی دست‌نویس و صفی که هر صبح جلوتر از ساعت بازگشایی تشکیل می‌شد.",
  },
  {
    year: "۱۴۰۲",
    title: "خرید مستقیم از مبدأ",
    body: "اولین محمولهٔ مستقیم از مزارع اتیوپی و کلمبیا؛ بدون واسطه، با قراردادهای بلندمدت و قیمت منصفانه.",
  },
  {
    year: "۱۴۰۴",
    title: "برشته‌خانهٔ نیلی",
    body: "کارگاه ۴۰۰ متری با آزمایشگاه چشایی و آکادمی آموزش؛ امروز هر پنجشنبه، روز برشت تازهٔ ماست.",
  },
];

export const STATS = [
  { value: 1399, label: "سال آغاز", plain: true },
  { value: 12, label: "کافهٔ فعال" },
  { value: 9, label: "مبدأ فعال" },
  { value: 120000, label: "فنجان در ماه" },
];

export const TICKER_ITEMS = [
  "پنجشنبه‌ها روز برشت تازه است",
  "ارسال رایگان سفارش‌های بالای ۸۰۰ هزار تومان",
  "خرید مستقیم از ۹ مزرعهٔ همکار",
  "هر پاکت، حداکثر ۱۰ روز پس از برشت به دست شما می‌رسد",
  "کلاس دم دستی رایگان با هر خرید کیت",
];

export const NAV = [
  { href: "#shop", label: "فروشگاه" },
  { href: "#subscribe", label: "اشتراک" },
  { href: "#story", label: "داستان ما" },
  { href: "#cafes", label: "کافه‌ها" },
  { href: "#brew", label: "دم‌آوری" },
  { href: "#journal", label: "ژورنال" },
];
