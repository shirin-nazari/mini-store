import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    tag: "New Collection",
    title: "Better Products\nBetter Life",
    description:
      "Discover amazing products with the best quality and affordable prices.",
    button: "Shop Now",
    image: "/hero-headphone.webp",
  },
  {
    id: 2,
    tag: "New Arrival",
    title: "Smart Style\nFor Every Day",
    description:
      "Explore our latest smart watches with modern design and great features.",
    button: "Explore Now",
    image: "/hero-watch.webp",
  },
  {
    id: 3,
    tag: "Special Offer",
    title: "Step Into\nSomething Better",
    description:
      "Find your favorite shoes with amazing prices and premium quality.",
    button: "Shop Deals",
    image: "/hero-shoes.webp",
  },
];
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-xl bg-[#fcf5f5]">
      <div className="flex items-center px-6 py-8 min-h-[300px] md:min-h-[380px] md:px-12">
        {/* text */}
        <div className="z-10 w-1/2 mx-4">
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-medium text-rose-950">
            {slide.tag}
          </span>
          <h1 className="mt-4 whitespace-pre-line text-3xl font-bold leading-tight text-rose-900 md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-5 text-slate-500 md:text-base">
            {slide.description}
          </p>
          <button className="mt-6 rounded-lg bg-rose-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-950">
            {slide.button}
            <span className="ml-2">→</span>
          </button>
        </div>
        {/* Image */}
        <div className="flex w-1/2 justify-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-55 w-55 object-contain transition-all duration-500 md:h-80 md:w-80"
          />
        </div>
      </div>
      {/* Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        <ChevronLeft size={20} className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        <ChevronRight size={20} className="text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-4 bg-rose-950" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
