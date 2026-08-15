import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, MapPin, Truck, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, formatWeight } from "@/data/products";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "پرداخت و ثبت سفارش | قهوه دَمان" },
      {
        name: "description",
        content:
          "تکمیل اطلاعات خریدار، انتخاب روش ارسال و پرداخت برای ثبت سفارش قهوه.",
      },
      { property: "og:title", content: "پرداخت و ثبت سفارش | قهوه دَمان" },
      {
        property: "og:description",
        content: "ثبت سفارش قهوه در چند مرحله‌ی ساده.",
      },
    ],
  }),
  component: CheckoutPage,
});

const SHIPPING_METHODS = [
  { key: "express", label: "ارسال سریع", note: "۱ تا ۲ روز کاری" },
  { key: "normal", label: "ارسال عادی", note: "۳ تا ۵ روز کاری" },
] as const;

const PAYMENT_METHODS = [
  { key: "online", label: "پرداخت اینترنتی", icon: CreditCard },
  { key: "wallet", label: "کیف پول", icon: Wallet },
] as const;

const FIELDS = [
  { id: "fullName", label: "نام و نام خانوادگی", type: "text" },
  { id: "phone", label: "شماره موبایل", type: "tel" },
  { id: "province", label: "استان", type: "text" },
  { id: "city", label: "شهر", type: "text" },
  { id: "postal", label: "کد پستی", type: "text" },
] as const;

function Field({
  label,
  type,
  className,
}: {
  label: string;
  type: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-xs tracking-widest text-subtle">
        {label}
      </span>
      <input
        type={type}
        required
        className="w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-border"
      />
    </label>
  );
}

function CheckoutPage() {
  const { detailed, subtotal, shipping, total, clear } = useCart();
  const [shippingMethod, setShippingMethod] = useState<string>("express");
  const [payment, setPayment] = useState<string>("online");
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setDone(true);
    clear();
    toast.success("سفارش شما ثبت شد");
  }

  if (done) {
    return (
      <div className="px-5 pt-40 pb-8 sm:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-panel/70 p-12 text-center">
          <h1 className="text-2xl font-bold text-gold">سفارش شما ثبت شد</h1>
          <p className="mt-4 text-sm leading-loose text-muted-foreground">
            جزئیات سفارش برای شما پیامک می‌شود. قهوه پس از رُست و آسیاب ارسال
            خواهد شد.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="ثبت سفارش" title="پرداخت و ثبت سفارش" />
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
          <form
            onSubmit={submit}
            className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]"
          >
            <div className="space-y-6">
              <section className="rounded-3xl border border-hairline bg-panel/60 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  اطلاعات خریدار
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <Field key={f.id} label={f.label} type={f.type} />
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs tracking-widest text-subtle">
                      آدرس
                    </span>
                    <textarea
                      required
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-border"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-3xl border border-hairline bg-panel/60 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Truck className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  روش ارسال
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {SHIPPING_METHODS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setShippingMethod(m.key)}
                      className={cn(
                        "rounded-2xl border p-4 text-start transition-all duration-300",
                        shippingMethod === m.key
                          ? "border-border bg-gold/10"
                          : "border-hairline hover:border-border",
                      )}
                    >
                      <span className="block text-sm text-foreground">
                        {m.label}
                      </span>
                      <span className="mt-1 block text-xs text-subtle">
                        {m.note}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-hairline bg-panel/60 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <CreditCard className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  روش پرداخت
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setPayment(m.key)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border p-4 text-sm transition-all duration-300",
                        payment === m.key
                          ? "border-border bg-gold/10 text-gold"
                          : "border-hairline text-muted-foreground hover:border-border",
                      )}
                    >
                      <m.icon className="h-4 w-4" strokeWidth={1.5} />
                      {m.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-panel/70 p-6 lg:sticky lg:top-32">
              <h2 className="text-base font-semibold text-foreground">
                خلاصه سفارش
              </h2>
              <ul className="mt-6 space-y-4">
                {detailed.map(({ item, product, linePrice }) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="block truncate text-foreground">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-subtle">
                        {formatWeight(item.weight)} · {item.grind} ×{" "}
                        {item.quantity}
                      </span>
                    </div>
                    <span className="shrink-0 text-foreground">
                      {formatPrice(linePrice)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-4 border-t border-hairline pt-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">جمع کل</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">هزینه ارسال</span>
                  <span>
                    {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold">
                  <span>مبلغ نهایی</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                پرداخت و ثبت سفارش
              </button>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
