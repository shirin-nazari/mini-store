import { Link } from "@tanstack/react-router";

const linkCls = "text-sm text-rose-100 transition hover:text-white";
const titleCls = "mb-2 text-sm font-semibold text-white";

const socials = [
  { src: "/instagram.png", alt: "Instagram", href: "https://instagram.com" },
  { src: "/telegram.png", alt: "Telegram", href: "https://telegram.org" },
  { src: "/facebook.png", alt: "Facebook", href: "https://facebook.com" },
];

const Footer = () => {
  return (
    <footer className="bg-red-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-3 rounded-xl bg-rose-100/10 p-2">
            <img
              src="/logo-miniShop.png"
              alt="miniShop"
              className="h-16 w-28 object-contain"
            />
          </div>
          <p className="max-w-xs text-sm text-rose-200">
            Your favorite products, all in one place. Discover quality products
            at great prices.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-start">
          <h2 className={titleCls}>Quick Links</h2>
          <Link to="/" className={linkCls}>
            Home
          </Link>
          <Link to="/category" className={linkCls}>
            Categories
          </Link>
          <Link to="/deals" className={linkCls}>
            Deals
          </Link>
          <Link to="/about" className={linkCls}>
            About Us
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-start">
          <h2 className={titleCls}>Customer Service</h2>
          <Link to="/about" className={linkCls}>
            Contact Us
          </Link>
          <Link to="/about" className={linkCls}>
            FAQ
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-start">
          <h2 className={titleCls}>Follow Us</h2>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.alt}
                className="opacity-80 transition hover:opacity-100 bg-rose-100/20 rounded-full p-1"
              >
                <img src={s.src} alt="" className="h-9 w-9" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-red-800 py-4">
        <p className="text-center text-xs text-rose-200">
          © 2026 MiniShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
