import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatNumber } from "@/data/products";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import beansImage from "@/assets/category-beans.jpg";
import groundImage from "@/assets/category-ground.jpg";

const IMAGES: Record<string, string> = {
  beans: beansImage,
  ground: groundImage,
};

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "دسته‌بندی‌ها | قهوه دَمان" },
      {
        name: "description",
        content:
          "دسته‌بندی قهوه دانه و قهوه آسیاب‌شده؛ قهوه مورد علاقه‌تان را پیدا کنید.",
      },
      { property: "og:title", content: "دسته‌بندی‌ها | قهوه دَمان" },
      {
        property: "og:description",
        content: "قهوه دانه و قهوه آسیاب‌شده در فروشگاه قهوه دَمان.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="دسته‌بندی‌ها"
            title="قهوه مورد علاقه‌تان را پیدا کنید"
            description="دو مسیر ساده برای رسیدن به فنجان بهتر؛ دانه‌ی کامل یا آسیاب‌شده‌ی آماده."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CATEGORIES.map((category, i) => {
            const count = PRODUCTS.filter(
              (p) => p.category === category.slug,
            ).length;
            return (
              <Reveal key={category.slug} delay={i * 120}>
                <Link
                  to="/shop"
                  search={{ category: category.slug }}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-hairline transition-all duration-500 hover:border-border hover:shadow-panel"
                >
                  <img
                    src={IMAGES[category.slug]}
                    alt={category.title}
                    loading="lazy"
                    width={1200}
                    height={1408}
                    className="h-[420px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 sm:h-[520px]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-500 group-hover:from-background" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <span className="text-[11px] tracking-[0.25em] text-gold">
                      {formatNumber(count)} محصول
                    </span>
                    <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-loose text-muted-foreground">
                      {category.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs text-gold opacity-80 transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground group-hover:opacity-100">
                      مشاهده محصولات
                      <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
