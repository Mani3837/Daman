import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "پرفروش‌ترین قهوه‌ها | قهوه دَمان" },
      {
        name: "description",
        content:
          "پرفروش‌ترین قهوه‌های فروشگاه؛ انتخاب محبوب قهوه‌دوستان از میان دانه و آسیاب‌شده.",
      },
      { property: "og:title", content: "پرفروش‌ترین قهوه‌ها | قهوه دَمان" },
      {
        property: "og:description",
        content: "انتخاب محبوب قهوه‌دوستان در فروشگاه قهوه دَمان.",
      },
    ],
  }),
  component: BestSellersPage,
});

function BestSellersPage() {
  const products = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="پرفروش‌ها"
            title="پرفروش‌ترین قهوه‌ها"
            description="انتخاب محبوب قهوه‌دوستان"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
