import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ_ITEMS = [
  {
    q: "قهوه‌ها به صورت دانه ارسال می‌شوند یا آسیاب‌شده؟",
    a: "هر دو حالت ممکن است. در صفحه‌ی محصول می‌توانید «دانه کامل» یا یکی از آسیاب‌های اسپرسو، موکاپات، فرانسه و دمی را انتخاب کنید.",
  },
  {
    q: "چه درجه آسیابی برای قهوه من مناسب است؟",
    a: "آسیاب بر اساس روش دم‌آوری انتخاب می‌شود؛ اسپرسو آسیاب ریز، موکاپات متوسط‌ریز، دمی متوسط و فرانسه آسیاب درشت می‌خواهد.",
  },
  {
    q: "آیا می‌توانم وزن قهوه را انتخاب کنم؟",
    a: "بله. بسته‌های ۲۵۰ گرم، ۵۰۰ گرم و ۱ کیلوگرم در دسترس است و قیمت بر اساس وزن انتخابی محاسبه می‌شود.",
  },
  {
    q: "درصد ترکیب قهوه به چه معناست؟",
    a: "نسبت دانه‌های عربیکا به روبوستا در هر ترکیب است؛ عربیکای بیشتر طعم‌های شفاف‌تر و روبوستای بیشتر بدنه و کافئین بالاتر می‌دهد.",
  },
  {
    q: "سفارش‌ها چه زمانی ارسال می‌شوند؟",
    a: "سفارش‌ها پس از رُست و آسیاب، در اولین روز کاری بسته‌بندی و ارسال می‌شوند.",
  },
  {
    q: "چگونه می‌توانم سفارش خود را پیگیری کنم؟",
    a: "از بخش حساب کاربری و تب «سفارش‌ها» می‌توانید وضعیت و کد رهگیری سفارش خود را ببینید.",
  },
];

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="border-b border-hairline"
        >
          <AccordionTrigger className="py-6 text-start text-sm font-medium text-foreground hover:no-underline hover:text-gold sm:text-base">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-sm leading-loose text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
