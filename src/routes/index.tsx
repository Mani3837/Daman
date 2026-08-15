import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Coffee,
  Leaf,
  Package,
  Settings2,
  Truck,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/faq-list";
import heroImage from "@/assets/hero-beans.jpg";
import beansImage from "@/assets/category-beans.jpg";
import groundImage from "@/assets/category-ground.jpg";
import brandImage from "@/assets/brand-craft.jpg";
import showcaseImage from "@/assets/showcase-layered.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "قهوه دَمان | خرید قهوه دانه و آسیاب‌شده" },
      {
        name: "description",
        content:
          "فروشگاه تخصصی قهوه: دانه‌های انتخاب‌شده، رُست تازه و آسیاب متناسب با روش دم‌آوری شما. هر فنجان، آغاز یک تجربه است.",
      },
      {
        property: "og:title",
        content: "قهوه دَمان | خرید قهوه دانه و آسیاب‌شده",
      },
      {
        property: "og:description",
        content: "قهوه‌ای تازه، باکیفیت و انتخاب‌شده برای تجربه‌ای متفاوت.",
      },
    ],
  }),
  component: Index,
});

const CATEGORY_IMAGES: Record<string, string> = {
  beans: beansImage,
  ground: groundImage,
};

const BENEFITS = [
  { icon: Leaf, title: "تازگی و کیفیت قهوه" },
  { icon: Coffee, title: "انتخاب دقیق دانه‌ها" },
  { icon: Settings2, title: "آسیاب متناسب با روش دم‌آوری" },
  { icon: Package, title: "بسته‌بندی مناسب" },
  { icon: Truck, title: "ارسال سریع" },
  { icon: Headphones, title: "پشتیبانی مشتریان" },
];

function Index() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={heroImage}
          alt="دانه‌های قهوه تازه رُست‌شده روی چوب تیره"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/55" />
        <div className="absolute inset-0 bg-background/25" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 pt-36 pb-24 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[11px] tracking-[0.3em] text-gold">
                قهوه تخصصی
              </span>
            </div>
            <h1 className="mt-7 max-w-2xl text-3xl leading-[1.5] font-bold text-foreground sm:text-5xl lg:text-6xl">
              هر فنجان، آغاز یک تجربه است.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-loose text-muted-foreground sm:text-base">
              قهوه‌ای تازه، باکیفیت و انتخاب‌شده برای تجربه‌ای متفاوت.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
              >
                مشاهده محصولات
              </Link>
              <Link
                to="/best-sellers"
                className="rounded-full border border-border px-7 py-3.5 text-sm text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                پرفروش‌ها
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="دسته‌بندی‌ها"
              title="قهوه مورد علاقه‌تان را پیدا کنید"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {CATEGORIES.map((category, i) => (
              <Reveal key={category.slug} delay={i * 120}>
                <Link
                  to="/shop"
                  search={{ category: category.slug }}
                  className="group relative block overflow-hidden rounded-3xl border border-hairline transition-all duration-500 hover:border-border hover:shadow-panel"
                >
                  <img
                    src={CATEGORY_IMAGES[category.slug]}
                    alt={category.title}
                    loading="lazy"
                    width={1200}
                    height={1408}
                    className="h-[400px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 sm:h-[480px]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent transition-opacity duration-500 group-hover:from-background" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-loose text-muted-foreground">
                      {category.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs text-gold opacity-75 transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground group-hover:opacity-100">
                      مشاهده محصولات
                      <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="پرفروش‌ها"
              title="پرفروش‌ترین قهوه‌ها"
              description="انتخاب محبوب قهوه‌دوستان"
              action={
                <Link
                  to="/best-sellers"
                  className="shrink-0 rounded-full border border-hairline px-5 py-2.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-gold"
                >
                  مشاهده همه
                </Link>
              }
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-hairline">
              <img
                src={brandImage}
                alt="استخراج اسپرسو در نوری گرم و تاریک"
                loading="lazy"
                width={1408}
                height={1600}
                className="h-[420px] w-full object-cover transition-transform duration-[1600ms] hover:scale-105 sm:h-[560px]"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[11px] tracking-[0.25em] text-gold">
                کیفیت
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              قهوه‌ای که با دقت انتخاب شده است
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-loose text-muted-foreground sm:text-base">
              از انتخاب دانه تا رُست و آسیاب، هر مرحله برای رسیدن به یک فنجان
              بهتر با دقت انجام می‌شود.
            </p>
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              درباره ما
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-hairline">
              <img
                src={showcaseImage}
                alt="کیسه دانه‌های قهوه و پیمانه‌ی برنجی در نور گرم"
                loading="lazy"
                width={1408}
                height={1008}
                className="h-[420px] w-full object-cover sm:h-[560px]"
              />
              <span className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/40 to-transparent" />

              <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col justify-center gap-5 p-7 sm:p-12">
                <div className="rounded-3xl border border-border bg-panel/80 p-6 backdrop-blur-xl">
                  <span className="text-[11px] tracking-[0.25em] text-gold">
                    از مزرعه تا فنجان
                  </span>
                  <p className="mt-4 text-sm leading-loose text-muted-foreground">
                    دانه‌ها در بسته‌های کوچک رُست می‌شوند تا تازگی و طعم‌نت‌ها
                    حفظ شود.
                  </p>
                </div>
                <div className="ms-6 rounded-3xl border border-hairline bg-espresso/80 p-6 backdrop-blur-xl">
                  <p className="text-sm leading-loose text-foreground">
                    آسیاب سفارش شما دقیقاً پیش از ارسال انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="مزیت‌ها"
              title="چرا از ما خرید کنید؟"
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group flex h-full items-center gap-4 rounded-3xl border border-hairline bg-panel/50 p-6 transition-all duration-500 hover:border-border">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-gold transition-colors duration-500 group-hover:border-border">
                    <item.icon className="h-5 w-5" strokeWidth={1.3} />
                  </span>
                  <span className="min-w-0 text-sm text-foreground">
                    {item.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-5 py-16 sm:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-border bg-surface/80 p-8 text-center sm:p-14">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              قهوه خوب را از دست ندهید
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-loose text-muted-foreground">
              برای اطلاع از قهوه‌های جدید و پیشنهادهای ویژه عضو شوید.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
                toast.success("عضویت شما ثبت شد");
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل شما"
                className="min-w-0 flex-1 rounded-full border border-hairline bg-background/60 px-5 py-3.5 text-sm outline-none transition-colors focus:border-border placeholder:text-subtle"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                عضویت
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="راهنما"
              title="سوالات متداول"
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FaqList />
          </Reveal>
        </div>
      </section>
    </>
  );
}
