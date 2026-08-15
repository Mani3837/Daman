import { createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "سوالات متداول | قهوه دَمان" },
      {
        name: "description",
        content:
          "پاسخ پرسش‌های رایج درباره آسیاب، وزن بسته‌ها، درصد ترکیب و زمان ارسال سفارش قهوه.",
      },
      { property: "og:title", content: "سوالات متداول | قهوه دَمان" },
      {
        property: "og:description",
        content: "راهنمای خرید و پرسش‌های رایج قهوه دَمان.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="راهنما"
            title="سوالات متداول"
            description="اگر پاسخ پرسش خود را پیدا نکردید، از بخش تماس با ما در ارتباط باشید."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <FaqList />
        </Reveal>
      </div>
    </div>
  );
}
