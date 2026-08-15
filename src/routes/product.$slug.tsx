import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Heart, Minus, Plus, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  GRIND_OPTIONS,
  PRODUCTS,
  formatNumber,
  formatPrice,
  formatWeight,
  getProduct,
  priceForWeight,
} from "@/data/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "محصول یافت نشد | قهوه دَمان" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} | قهوه دَمان`;
    const description = `${product.name} — ${product.blend}، ${product.roast}. ${product.description}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { addItem, toggleWishlist, wishlist } = useCart();
  const [weight, setWeight] = useState<number>(product.weights[0] ?? 250);
  const [grind, setGrind] = useState<string>(
    product.category === "beans" ? GRIND_OPTIONS[0] : GRIND_OPTIONS[1],
  );
  const [quantity, setQuantity] = useState(1);
  const liked = wishlist.includes(product.slug);
  const unitPrice = priceForWeight(product, weight);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  function add() {
    addItem({ slug: product.slug, weight, grind, quantity });
    toast.success(`${product.name} به سبد خرید اضافه شد`);
  }

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-gold"
        >
          بازگشت به فروشگاه
          <ChevronLeft className="h-4 w-4 rotate-180" strokeWidth={1.5} />
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl border border-hairline bg-panel">
              <img
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="aspect-square w-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-5 right-5 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] text-gold backdrop-blur-md">
                {product.badge}
              </span>
            )}
          </Reveal>

          <Reveal delay={120} className="flex flex-col">
            <span className="text-[11px] tracking-[0.25em] text-gold">
              {product.coffeeType}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-loose text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gold">
                {formatPrice(unitPrice)}
              </span>
              <span className="text-xs text-subtle">
                برای {formatWeight(weight)}
              </span>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <p className="mb-3 text-xs tracking-widest text-subtle">وزن</p>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeight(w)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs transition-all duration-300",
                        weight === w
                          ? "border-border bg-gold/10 text-gold"
                          : "border-hairline text-muted-foreground hover:border-border",
                      )}
                    >
                      {formatWeight(w)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs tracking-widest text-subtle">
                  نوع آسیاب
                </p>
                <div className="flex flex-wrap gap-2">
                  {GRIND_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrind(g)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs transition-all duration-300",
                        grind === g
                          ? "border-border bg-gold/10 text-gold"
                          : "border-hairline text-muted-foreground hover:border-border",
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex">
                <div className="flex items-center gap-4 rounded-full border border-hairline px-4 py-2">
                  <button
                    type="button"
                    aria-label="کاهش تعداد"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="min-w-8 text-center text-sm">
                    {formatNumber(quantity)}
                  </span>
                  <button
                    type="button"
                    aria-label="افزایش تعداد"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  onClick={() => toggleWishlist(product.slug)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold"
                >
                  <Heart
                    className={cn("h-4 w-4", liked && "fill-gold text-gold")}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={add}
                  className="flex-1 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  افزودن به سبد خرید
                </button>
                <button
                  type="button"
                  onClick={() => {
                    add();
                    void navigate({ to: "/checkout" });
                  }}
                  className="flex-1 rounded-full border border-border px-6 py-3.5 text-sm text-gold transition-colors hover:bg-gold/10"
                >
                  خرید سریع
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-subtle">
                <Truck className="h-4 w-4" strokeWidth={1.5} />
                ارسال سریع پس از رُست و آسیاب سفارش
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-y-5 rounded-3xl border border-hairline bg-panel/60 p-6 text-sm">
              {[
                ["درصد ترکیب", product.blend],
                ["نوع قهوه", product.coffeeType],
                ["درجه رُست", product.roast],
                ["طعم‌نت‌ها", product.notes.join("، ")],
                ["روش پیشنهادی دم‌آوری", product.brewing],
                ["وزن‌های موجود", product.weights.map(formatWeight).join("، ")],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="text-[11px] tracking-widest text-subtle">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <section className="mt-24">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            قهوه‌های مشابه
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
