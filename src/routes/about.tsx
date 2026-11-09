import { createFileRoute, Link } from "@tanstack/react-router";
import HeroAbout from "../components/about/Hero";
import { Heart, ShoppingCart, Star } from "lucide-react";
import AboutCart from "../components/about/AboutCart";
import OurMission from "../components/about/Mission";

export const Route = createFileRoute("/about")({
  component: About,
});
const cart = [
  {
    icon: Star,
    title: "Quality First",
    description: "Products selected with care for your everyday needs.",
  },
  {
    icon: ShoppingCart,
    title: "Easy Shopping",
    description:
      "A simple and smooth shopping experience from browsing to checkout.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Designed around your needs, preferences, and convenience.",
  },
];
function About() {
  return (
    <div className="container mx-auto px-4 xl:px-0">
      <HeroAbout />
      <div className="flex flex-col items-center my-10">
        <h1 className="mb-5 text-center text-2xl font-bold text-rose-950 md:text-3xl">
          What We Believe In
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3  w-full max-w-7xl  gap-4 md:gap-8">
          {cart.map((item) => (
            <AboutCart key={item.title} {...item} />
          ))}
        </div>
      </div>
      <OurMission />
      <div className="flex flex-col gap-4 py-10 items-center text-center mx-auto my-6 max-w-7xl overflow-hidden rounded-xl bg-linear-to-b from-red-900 via-red-800 to-red-700 ">
        <h2 className="text-2xl font-bold text-white ">
          Ready to Find Your Next Favorite?
        </h2>
        <p className="text-lg font-semibold text-gray-100">
          Explore our collection and discover something you'll love.
        </p>
        <Link
          to="/products"
          className="bg-gray-50 text-red-950 text-md rounded-xl px-4 py-2 font-semibold hover:bg-gray-200"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
