import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Package, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حساب کاربری | قهوه دَمان" },
      {
        name: "description",
        content:
          "حساب کاربری شما؛ پیگیری سفارش‌ها، علاقه‌مندی‌ها و اطلاعات شخصی.",
      },
      { property: "og:title", content: "حساب کاربری | قهوه دَمان" },
      {
        property: "og:description",
        content: "سفارش‌ها، علاقه‌مندی‌ها و اطلاعات حساب کاربری.",
      },
    ],
  }),
  component: AccountPage,
});

const ORDERS = [
  {
    code: "DMN-۱۰۲۴",
    date: "۲۲ مرداد ۱۴۰۵",
    status: "ارسال شده",
    amount: 620000,
  },
  {
    code: "DMN-۱۰۱۹",
    date: "۹ مرداد ۱۴۰۵",
    status: "در حال آماده‌سازی",
    amount: 285000,
  },
];

function AccountPage() {
  const { wishlist } = useCart();
  const liked = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="حساب کاربری" title="حساب کاربری" />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <Tabs defaultValue="orders">
            <TabsList className="w-full justify-start gap-2 rounded-full border border-hairline bg-panel/60 p-1.5">
              <TabsTrigger value="orders" className="rounded-full text-xs">
                <Package className="me-2 h-4 w-4" strokeWidth={1.5} />
                سفارش‌ها
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="rounded-full text-xs">
                <Heart className="me-2 h-4 w-4" strokeWidth={1.5} />
                علاقه‌مندی‌ها
              </TabsTrigger>
              <TabsTrigger value="info" className="rounded-full text-xs">
                <User className="me-2 h-4 w-4" strokeWidth={1.5} />
                اطلاعات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-8 space-y-4">
              {ORDERS.map((order) => (
                <div
                  key={order.code}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border border-hairline bg-panel/60 p-5 sm:flex sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">
                      سفارش {order.code}
                    </p>
                    <p className="mt-1.5 text-xs text-subtle">{order.date}</p>
                  </div>
                  <div className="shrink-0 text-end">
                    <p className="text-xs text-gold">{order.status}</p>
                    <p className="mt-1.5 text-sm font-bold">
                      {formatPrice(order.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="wishlist" className="mt-8">
              {liked.length === 0 ? (
                <div className="rounded-3xl border border-hairline bg-panel/60 p-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    فهرست علاقه‌مندی‌های شما خالی است.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  >
                    مشاهده محصولات
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {liked.map((product) => (
                    <li
                      key={product.slug}
                      className="flex items-center gap-4 rounded-3xl border border-hairline bg-panel/60 p-4"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={1000}
                        height={1000}
                        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          className="block truncate text-sm text-foreground hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1.5 text-xs text-subtle">
                          {product.blend}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="info" className="mt-8">
              <div className="grid gap-5 rounded-3xl border border-hairline bg-panel/60 p-6 sm:grid-cols-2 sm:p-8">
                {["نام و نام خانوادگی", "شماره موبایل", "ایمیل", "شهر"].map(
                  (label) => (
                    <label key={label} className="block">
                      <span className="mb-2 block text-xs tracking-widest text-subtle">
                        {label}
                      </span>
                      <input
                        className="w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-border"
                      />
                    </label>
                  ),
                )}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    ذخیره اطلاعات
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </div>
  );
}
