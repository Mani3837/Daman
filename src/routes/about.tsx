import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import brandImage from "@/assets/brand-craft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ما | قهوه دَمان" },
      {
        name: "description",
        content:
          "درباره قهوه دَمان؛ فروشگاه تخصصی قهوه دانه و آسیاب‌شده. این بخش برای معرفی برند آماده است.",
      },
      { property: "og:title", content: "درباره ما | قهوه دَمان" },
      {
        property: "og:description",
        content: "معرفی برند قهوه دَمان.",
      },
    ],
  }),
  component: AboutPage,
});

/** بخش‌های زیر عمداً خالی گذاشته شده‌اند تا داستان واقعی برند جایگزین شود. */
const BLOCKS = [
  { title: "داستان ما", body: "" },
  { title: "فلسفه‌ی ما", body: "" },
  { title: "تماس با ما", body: "" },
];

function AboutPage() {
  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="درباره ما" title="درباره ما" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal className="space-y-5">
            {BLOCKS.map((block) => (
              <div
                key={block.title}
                className="rounded-3xl border border-hairline bg-panel/60 p-7 sm:p-9"
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {block.title}
                </h2>
                <div className="mt-4 space-y-3">
                  <span className="block h-3 w-full max-w-lg rounded-full bg-espresso/70" />
                  <span className="block h-3 w-full max-w-md rounded-full bg-espresso/60" />
                  <span className="block h-3 w-full max-w-xs rounded-full bg-espresso/50" />
                </div>
                <p className="mt-5 text-xs text-subtle">
                  این بخش برای تکمیل با متن برند آماده است.
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-3xl border border-hairline">
              <img
                src={brandImage}
                alt="آماده‌سازی قهوه در فضایی تاریک و گرم"
                loading="lazy"
                width={1408}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
