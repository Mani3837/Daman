import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, X } from "lucide-react";
import { z } from "zod";
import {
  CATEGORIES,
  PRODUCTS,
  formatNumber,
  formatPrice,
  formatWeight,
} from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.enum(["beans", "ground"]).optional(),
  best: z.boolean().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "فروشگاه قهوه | قهوه دَمان" },
      {
        name: "description",
        content:
          "خرید قهوه دانه و قهوه آسیاب‌شده با فیلتر دسته‌بندی، قیمت، وزن و درصد ترکیب.",
      },
      { property: "og:title", content: "فروشگاه قهوه | قهوه دَمان" },
      {
        property: "og:description",
        content: "قهوه دانه و آسیاب‌شده، رُست تازه با ارسال سریع.",
      },
    ],
  }),
  component: ShopPage,
});

const SORTS = [
  { key: "best", label: "پرفروش‌ترین" },
  { key: "new", label: "جدیدترین" },
  { key: "cheap", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
] as const;

const PRICE_RANGES = [
  { key: "all", label: "همه قیمت‌ها", min: 0, max: Infinity },
  { key: "low", label: "تا ۲۸۰ هزار تومان", min: 0, max: 280000 },
  { key: "mid", label: "۲۸۰ تا ۳۵۰ هزار تومان", min: 280000, max: 350000 },
  { key: "high", label: "بیش از ۳۵۰ هزار تومان", min: 350000, max: Infinity },
] as const;

const WEIGHTS = [250, 500, 1000];
const BLENDS = Array.from(new Set(PRODUCTS.map((p) => p.blend)));

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs transition-all duration-300",
        active
          ? "border-border bg-gold/10 text-gold"
          : "border-hairline text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ShopPage() {
  const search = Route.useSearch();
  const [term, setTerm] = useState(search.q ?? "");
  const [category, setCategory] = useState<string>(search.category ?? "all");
  const [price, setPrice] = useState<string>("all");
  const [weight, setWeight] = useState<number | "all">("all");
  const [blend, setBlend] = useState<string>("all");
  const [sort, setSort] = useState<string>(search.best ? "best" : "best");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === price) ?? PRICE_RANGES[0]!;
    let list = PRODUCTS.filter((p) => {
      if (term && !`${p.name} ${p.blend} ${p.coffeeType}`.includes(term))
        return false;
      if (category !== "all" && p.category !== category) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (weight !== "all" && !p.weights.includes(weight)) return false;
      if (blend !== "all" && p.blend !== blend) return false;
      if (search.best && !p.bestSeller) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "new") return b.createdOrder - a.createdOrder;
      return Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false);
    });

    return list;
  }, [term, category, price, weight, blend, sort, search.best]);

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="فروشگاه"
            title={search.best ? "پرفروش‌ترین قهوه‌ها" : "فروشگاه"}
            description="قهوه دانه و آسیاب‌شده؛ با فیلترها انتخاب خود را دقیق‌تر کنید."
          />
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-hairline bg-panel/60 p-5 sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 rounded-full border border-hairline px-4 py-2.5 sm:w-80">
              <Search
                className="h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="جستجوی قهوه…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
              />
              {term && (
                <button
                  type="button"
                  aria-label="پاک کردن جستجو"
                  onClick={() => setTerm("")}
                  className="shrink-0 text-subtle hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-gold lg:hidden"
            >
              <Filter className="h-4 w-4" strokeWidth={1.5} />
              فیلترها
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              {SORTS.map((s) => (
                <Chip
                  key={s.key}
                  active={sort === s.key}
                  onClick={() => setSort(s.key)}
                >
                  {s.label}
                </Chip>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-5 border-t border-hairline pt-5",
              !filtersOpen && "hidden lg:flex",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="me-2 text-[11px] tracking-widest text-subtle">
                دسته‌بندی
              </span>
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                همه
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip
                  key={c.slug}
                  active={category === c.slug}
                  onClick={() => setCategory(c.slug)}
                >
                  {c.title}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="me-2 text-[11px] tracking-widest text-subtle">
                قیمت
              </span>
              {PRICE_RANGES.map((r) => (
                <Chip
                  key={r.key}
                  active={price === r.key}
                  onClick={() => setPrice(r.key)}
                >
                  {r.label}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="me-2 text-[11px] tracking-widest text-subtle">
                وزن
              </span>
              <Chip active={weight === "all"} onClick={() => setWeight("all")}>
                همه
              </Chip>
              {WEIGHTS.map((w) => (
                <Chip
                  key={w}
                  active={weight === w}
                  onClick={() => setWeight(w)}
                >
                  {formatWeight(w)}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="me-2 text-[11px] tracking-widest text-subtle">
                درصد ترکیب
              </span>
              <Chip active={blend === "all"} onClick={() => setBlend("all")}>
                همه
              </Chip>
              {BLENDS.map((b) => (
                <Chip key={b} active={blend === b} onClick={() => setBlend(b)}>
                  {b}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:hidden">
              <span className="me-2 text-[11px] tracking-widest text-subtle">
                ترتیب
              </span>
              {SORTS.map((s) => (
                <Chip
                  key={s.key}
                  active={sort === s.key}
                  onClick={() => setSort(s.key)}
                >
                  {s.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-subtle">
          {formatNumber(results.length)} محصول یافت شد
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product, i) => (
            <Reveal key={product.slug} delay={i * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-10 rounded-3xl border border-hairline bg-panel/60 p-12 text-center">
            <p className="text-sm text-muted-foreground">
              محصولی با این فیلترها پیدا نشد. فیلترها را تغییر دهید.
            </p>
            <p className="mt-2 text-xs text-subtle">
              محدوده قیمت انتخابی: {formatPrice(0)} به بالا
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
