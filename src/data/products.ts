import espressoBlend from "@/assets/product-espresso-blend.jpg";
import arabica from "@/assets/product-arabica.jpg";
import special from "@/assets/product-special.jpg";
import medium from "@/assets/product-medium.jpg";
import darkRoast from "@/assets/product-dark-roast.jpg";
import singleOrigin from "@/assets/product-single-origin.jpg";

export type CategorySlug = "beans" | "ground";

export const GRIND_OPTIONS = [
  "دانه کامل",
  "آسیاب اسپرسو",
  "آسیاب موکاپات",
  "آسیاب فرانسه",
  "آسیاب دمی",
] as const;

export type GrindOption = (typeof GRIND_OPTIONS)[number];

export const CATEGORIES: {
  slug: CategorySlug;
  title: string;
  description: string;
}[] = [
  {
    slug: "beans",
    title: "قهوه دانه",
    description: "دانه‌های تازه رُست‌شده، آماده برای آسیاب در خانه.",
  },
  {
    slug: "ground",
    title: "قهوه آسیاب‌شده",
    description: "آسیاب دقیق و متناسب با روش دم‌آوری شما.",
  },
];

export type Product = {
  slug: string;
  /** نام محصول — به‌راحتی قابل ویرایش */
  name: string;
  /** قیمت پایه برای وزن ۲۵۰ گرم (تومان) */
  price: number;
  category: CategorySlug;
  /** وزن‌های موجود (گرم) */
  weights: number[];
  /** درصد ترکیب — مثال: ۷۰٪ عربیکا / ۳۰٪ روبوستا */
  blend: string;
  coffeeType: string;
  roast: string;
  notes: string[];
  brewing: string;
  description: string;
  badge?: "پرفروش" | "جدید" | "ویژه";
  bestSeller?: boolean;
  createdOrder: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "espresso-blend",
    name: "قهوه ترکیبی اسپرسو",
    price: 285000,
    category: "beans",
    weights: [250, 500, 1000],
    blend: "۷۰٪ عربیکا / ۳۰٪ روبوستا",
    coffeeType: "ترکیبی",
    roast: "رُست تیره",
    notes: ["کاکائو تلخ", "بادام بو داده", "کارامل"],
    brewing: "اسپرسو، موکاپات",
    description:
      "ترکیبی متعادل با بدنه‌ای سنگین و کرِما‌ی پایدار؛ انتخابی مطمئن برای اسپرسوی روزانه.",
    badge: "پرفروش",
    bestSeller: true,
    createdOrder: 4,
    image: espressoBlend,
  },
  {
    slug: "arabica-100",
    name: "قهوه ۱۰۰٪ عربیکا",
    price: 340000,
    category: "beans",
    weights: [250, 500, 1000],
    blend: "۱۰۰٪ عربیکا",
    coffeeType: "تک‌خاستگاه",
    roast: "رُست متوسط",
    notes: ["شکلات شیری", "میوه‌های خشک", "عسل"],
    brewing: "دمی، فرانسه، اسپرسو",
    description:
      "عربیکای خالص با اسیدیته‌ی ملایم و پایانی شیرین؛ برای کسانی که طعم‌های شفاف را دوست دارند.",
    badge: "ویژه",
    bestSeller: true,
    createdOrder: 5,
    image: arabica,
  },
  {
    slug: "special-espresso",
    name: "قهوه اسپرسو ویژه",
    price: 395000,
    category: "beans",
    weights: [250, 500, 1000],
    blend: "۸۰٪ عربیکا / ۲۰٪ روبوستا",
    coffeeType: "ترکیبی ویژه",
    roast: "رُست تیره‌ی متعادل",
    notes: ["کاکائوی تلخ", "تنباکوی شیرین", "کارامل سوخته"],
    brewing: "اسپرسو",
    description:
      "ترکیب امضای ما؛ لایه‌های عمیق شکلاتی با بدنه‌ای مخملی و پایانی طولانی.",
    badge: "ویژه",
    bestSeller: true,
    createdOrder: 6,
    image: special,
  },
  {
    slug: "medium-blend",
    name: "قهوه ترکیبی مدیوم",
    price: 265000,
    category: "ground",
    weights: [250, 500],
    blend: "۶۰٪ عربیکا / ۴۰٪ روبوستا",
    coffeeType: "ترکیبی",
    roast: "رُست متوسط",
    notes: ["نان برشته", "فندق", "شکلات"],
    brewing: "موکاپات، فرانسه",
    description:
      "آسیاب‌شده و آماده‌ی دم‌آوری؛ تعادلی راحت میان شیرینی و تلخی برای هر روز.",
    badge: "پرفروش",
    bestSeller: true,
    createdOrder: 3,
    image: medium,
  },
  {
    slug: "dark-roast",
    name: "قهوه رُست تیره",
    price: 249000,
    category: "beans",
    weights: [250, 500, 1000],
    blend: "۵۰٪ عربیکا / ۵۰٪ روبوستا",
    coffeeType: "ترکیبی",
    roast: "رُست تیره",
    notes: ["کاکائو", "چوب دودی", "ادویه"],
    brewing: "اسپرسو، موکاپات",
    description: "بدنه‌ای پرقدرت با کافئین بالا؛ برای فنجان‌های بیدارکننده.",
    createdOrder: 2,
    image: darkRoast,
  },
  {
    slug: "light-filter",
    name: "قهوه دمی لایت",
    price: 310000,
    category: "ground",
    weights: [250, 500],
    blend: "۱۰۰٪ عربیکا",
    coffeeType: "تک‌خاستگاه",
    roast: "رُست روشن",
    notes: ["مرکبات", "گل یاس", "چای سیاه"],
    brewing: "دمی، کمکس، وی‌۶۰",
    description:
      "آسیاب مخصوص دم‌آوری دستی؛ روشن، معطر و پر از طعم‌نت‌های میوه‌ای.",
    badge: "جدید",
    createdOrder: 1,
    image: singleOrigin,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** قیمت بر اساس وزن انتخابی محاسبه می‌شود (پایه: ۲۵۰ گرم) */
export function priceForWeight(product: Product, weight: number) {
  return Math.round((product.price * weight) / 250);
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function formatWeight(weight: number) {
  return weight >= 1000
    ? `${formatNumber(weight / 1000)} کیلوگرم`
    : `${formatNumber(weight)} گرم`;
}
