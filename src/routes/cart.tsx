import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  FREE_SHIPPING_FROM,
  useCart,
} from "@/lib/cart";
import { formatNumber, formatPrice, formatWeight } from "@/data/products";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | قهوه دَمان" },
      {
        name: "description",
        content:
          "سبد خرید شما در فروشگاه قهوه دَمان؛ بازبینی وزن، نوع آسیاب و تعداد قهوه‌ها.",
      },
      { property: "og:title", content: "سبد خرید | قهوه دَمان" },
      {
        property: "og:description",
        content: "بازبینی سبد خرید و ادامه‌ی ثبت سفارش.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQuantity, removeItem, subtotal, shipping, total } =
    useCart();

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="سبد خرید" title="سبد خرید" />
        </Reveal>

        {detailed.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-hairline bg-panel/60 p-14 text-center">
            <p className="text-sm text-muted-foreground">
              سبد خرید شما خالی است.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <ul className="space-y-4">
              {detailed.map(({ item, product, unitPrice, linePrice }) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-3xl border border-hairline bg-panel/60 p-4 sm:p-5"
                >
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="shrink-0 overflow-hidden rounded-2xl"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div className="min-w-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          className="block truncate text-sm font-semibold text-foreground hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1.5 text-xs text-subtle">
                          {formatWeight(item.weight)} · {item.grind}
                        </p>
                        <p className="mt-1 text-xs text-subtle">
                          {formatPrice(unitPrice)} برای هر بسته
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="حذف از سبد خرید"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-subtle transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 rounded-full border border-hairline px-3 py-1.5">
                        <button
                          type="button"
                          aria-label="کاهش تعداد"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          className="text-muted-foreground hover:text-gold"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="min-w-6 text-center text-xs">
                          {formatNumber(item.quantity)}
                        </span>
                        <button
                          type="button"
                          aria-label="افزایش تعداد"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="text-muted-foreground hover:text-gold"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(linePrice)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl border border-border bg-panel/70 p-6 lg:sticky lg:top-32">
              <h2 className="text-base font-semibold text-foreground">
                خلاصه سفارش
              </h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">جمع کل</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">هزینه ارسال</dt>
                  <dd>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</dd>
                </div>
                <div className="h-px bg-hairline" />
                <div className="flex items-center justify-between text-base font-bold">
                  <dt>مبلغ نهایی</dt>
                  <dd className="text-gold">{formatPrice(total)}</dd>
                </div>
              </dl>

              {shipping > 0 && (
                <p className="mt-4 text-xs leading-loose text-subtle">
                  با خرید بیش از {formatPrice(FREE_SHIPPING_FROM)} ارسال رایگان
                  می‌شود.
                </p>
              )}

              <Link
                to="/checkout"
                className="mt-7 block rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                ادامه و ثبت سفارش
              </Link>
              <Link
                to="/shop"
                className="mt-3 block rounded-full border border-hairline px-6 py-3.5 text-center text-sm text-foreground transition-colors hover:border-border hover:text-gold"
              >
                ادامه خرید
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
