import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatNumber } from "@/data/products";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/logo-mark.png";

const NAV = [
  { to: "/", label: "صفحه اصلی" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/categories", label: "دسته‌بندی‌ها" },
  { to: "/best-sellers", label: "پرفروش‌ها" },
  { to: "/about", label: "درباره ما" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      <img
        src={logoMark}
        alt="نشان برند قهوه دَمان"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
        قهوه دَمان
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    void navigate({ to: "/shop", search: { q: term || undefined } });
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-hairline bg-panel/70 px-4 py-3 backdrop-blur-xl sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-gold transition-transform duration-500",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="جستجو"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold"
          >
            {searchOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Search className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>

          <Link
            to="/account"
            aria-label="حساب کاربری"
            className="hidden h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold sm:grid"
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-primary-foreground">
                {formatNumber(count)}
              </span>
            )}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="منو"
                className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-border hover:text-gold lg:hidden"
              >
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] border-hairline bg-surface p-6"
            >
              <div className="mb-8">
                <Logo />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-panel hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-4 h-px bg-hairline" />
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-panel hover:text-gold"
                >
                  حساب کاربری
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-panel hover:text-gold"
                >
                  سبد خرید
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-panel hover:text-gold"
                >
                  سوالات متداول
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={submitSearch}
          className="pointer-events-auto mx-auto mt-2 flex max-w-7xl items-center gap-3 rounded-2xl border border-border bg-panel/85 px-5 py-3 backdrop-blur-xl"
        >
          <Search className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          <input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="نام قهوه را جستجو کنید…"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full border border-border px-4 py-1.5 text-xs text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            جستجو
          </button>
        </form>
      )}
    </header>
  );
}
