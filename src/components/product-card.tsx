import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  formatPrice,
  formatWeight,
  type Product,
} from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const liked = wishlist.includes(product.slug);
  const defaultWeight = product.weights[0] ?? 250;
  const defaultGrind =
    product.category === "beans" ? "دانه کامل" : "آسیاب اسپرسو";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-panel/70 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-panel">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-4/5 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1000}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        {product.badge && (
          <span className="absolute top-4 right-4 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] text-gold backdrop-blur-md">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-4 right-4 text-[11px] text-muted-foreground">
          {product.blend}
        </span>
      </Link>

      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        onClick={() => {
          toggleWishlist(product.slug);
          toast.success(
            liked ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد",
          );
        }}
        className="absolute top-4 left-4 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-background/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-border hover:text-gold"
      >
        <Heart
          className={cn("h-4 w-4", liked && "fill-gold text-gold")}
          strokeWidth={1.5}
        />
      </button>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-w-0">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="block truncate text-base font-semibold text-foreground transition-colors group-hover:text-gold"
          >
            {product.name}
          </Link>
          <p className="mt-1.5 text-xs text-subtle">
            {formatWeight(defaultWeight)} · {product.blend}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-sm font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => {
              addItem({
                slug: product.slug,
                weight: defaultWeight,
                grind: defaultGrind,
              });
              toast.success(`${product.name} به سبد خرید اضافه شد`);
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
            افزودن
          </button>
        </div>
      </div>
    </article>
  );
}
