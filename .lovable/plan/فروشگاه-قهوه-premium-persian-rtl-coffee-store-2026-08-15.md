# فروشگاه قهوه — Premium Persian RTL Coffee Store

A dark, editorial, fully RTL Persian coffee e-commerce site focused only on coffee beans and ground coffee. Built as a polished front-end experience with working cart, filters, and checkout UI (no backend/login yet — data lives in code and cart state in the browser).

## Design system

- Full RTL: `<html lang="fa" dir="rtl">`, logical spacing utilities, mirrored icons/arrows.
- Fonts loaded via `<link>` in the root route: Vazirmatn (Yekan Bakh not freely hostable — used as first family name with Vazirmatn fallback).
- Tokens in `src/styles.css` (oklch equivalents of the given hex values): background `#0D0B09`, secondary `#15120F`, panel `#191613`, dark brown `#211812`, accent `#D99A32`, accent-soft `#F0B84B`, text `#F5F1EA`, muted `#A9A29A` / `#706A64`, gold hairline border + `rgba(255,255,255,0.08)` soft border.
- Consistent radius, thin golden hairlines used sparingly, soft shadows, light glass panels, restrained scroll-reveal + hover motion (fade-up, image zoom, border accent).
- Minimal line icons (lucide, thin stroke). No bright colors, no gradient spam.

## Pages / routes

- `/` — home: floating nav, cinematic hero ("هر فنجان، آغاز یک تجربه است.") with two CTAs, categories (قهوه دانه / قهوه آسیاب‌شده), پرفروش‌ترین قهوه‌ها, brand section ("قهوه‌ای که با دقت انتخاب شده است"), layered editorial product showcase, چرا از ما خرید کنید؟, newsletter, FAQ accordion, footer.
- `/shop` — فروشگاه: search, category / price / weight / blend filters, 4 sort options, responsive grid (desktop 3–4، تبلت 2–3، موبایل 1–2).
- `/product/$slug` — large imagery, weight selector, grinding selector (دانه کامل، آسیاب اسپرسو، موکاپات، فرانسه، دمی), blend %, roast, flavor notes, brewing method, quantity, افزودن به سبد خرید + خرید سریع.
- `/categories`, `/best-sellers` — filtered catalog views.
- `/about` — درباره ما with intentionally empty, easy-to-edit placeholder content blocks.
- `/cart` — dark cart: image, name, weight, grind, qty, price, remove, subtotal / shipping / total, ادامه خرید + ادامه و ثبت سفارش.
- `/checkout` — sectioned RTL form: اطلاعات خریدار، روش ارسال، روش پرداخت، خلاصه سفارش، پرداخت و ثبت سفارش.
- `/faq` — full accordion page (also embedded on home).
- Account, wishlist, and order-history UI as polished static/local screens (`/account` with tabs: سفارش‌ها، علاقه‌مندی‌ها، اطلاعات).

## Products & imagery

- Product data in one editable file (`src/data/products.ts`): name, price, weight options, blend %, coffee type, roast level, flavor notes, brew method, description, badge (پرفروش / جدید / ویژه). Seeded with قهوه ترکیبی اسپرسو، ۱۰۰٪ عربیکا، اسپرسو ویژه، ترکیبی مدیوم plus a few more for a full grid.
- Cards show only نام، قیمت، وزن، درصد ترکیب.
- Generate photorealistic dark cinematic coffee images (beans, roasted beans, ground coffee, bags, pouring, macro on dark wood) for hero, categories, showcase, and products.

## Technical notes

- TanStack Start file routes; each route gets its own Persian `head()` metadata (unique title/description/og).
- Cart state via a React context persisted to localStorage; toasts via sonner.
- No Cloud/backend in this pass — checkout and newsletter submit to local UI confirmation. Real auth/orders can be added later on Lovable Cloud.
