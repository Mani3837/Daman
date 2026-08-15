import { Link } from "@tanstack/react-router";
import { Instagram, Send, Twitter } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "فروشگاه",
    links: [
      { label: "فروشگاه", to: "/shop" },
      { label: "دسته‌بندی‌ها", to: "/categories" },
      { label: "پرفروش‌ها", to: "/best-sellers" },
    ],
  },
  {
    title: "راهنما",
    links: [
      { label: "راهنمای خرید", to: "/faq" },
      { label: "سوالات متداول", to: "/faq" },
      { label: "پیگیری سفارش", to: "/account" },
    ],
  },
  {
    title: "برند",
    links: [
      { label: "درباره ما", to: "/about" },
      { label: "تماس با ما", to: "/about" },
      { label: "حساب کاربری", to: "/account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-espresso/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoMark}
              alt="نشان برند قهوه دَمان"
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10"
            />
            <span className="text-lg font-bold text-foreground">قهوه دَمان</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-loose text-muted-foreground">
            دانه‌های انتخاب‌شده، رُست تازه و آسیاب متناسب با روش دم‌آوری شما.
          </p>
          <div className="mt-7 flex items-center gap-3">
            {[Instagram, Send, Twitter].map((Icon, i) => (
              <span
                key={i}
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs tracking-widest text-gold">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-subtle">
          تمامی حقوق این وب‌سایت محفوظ است.
        </p>
      </div>
    </footer>
  );
}
