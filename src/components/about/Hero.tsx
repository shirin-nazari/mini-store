import { Link } from "@tanstack/react-router";

const HeroAbout = () => {
  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-xl bg-red-50">
      <div className="flex items-center px-6 py-8 min-h-[300px] md:min-h-[380px] md:px-12">
        <div className="z-10 w-1/2 mx-4">
          <h1 className="mt-4 whitespace-pre-line text-3xl font-bold leading-tight text-rose-900 md:text-5xl">
            More Than Shopping
          </h1>
          <p className="mt-4 max-w-md text-sm leading-5 text-slate-500 md:text-base">
            We make everyday shopping simple, enjoyable, and convenient.
            Discover products you'll love, all in one place.{" "}
          </p>
          <Link to="/products">
            <button className="mt-6 rounded-lg bg-rose-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-950">
              Explore Products
              <span className="ml-2">→</span>
            </button>
          </Link>
        </div>
        {/* Image */}
        <div className="flex w-1/2 justify-center">
          <img
            src="/aboutShop.webp"
            alt="aboutShop"
            className="h-55 w-55 object-contain transition-all duration-500 md:h-96 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
