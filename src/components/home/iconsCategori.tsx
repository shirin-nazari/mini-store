import {
  Armchair,
  CookingPot,
  Dumbbell,
  HatGlasses,
  HousePlug,
  Laptop,
  Shirt,
  ShoppingBasket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
export const categoryIcons: Record<string, LucideIcon> = {
  beauty: Sparkles,
  furniture: Armchair,
  groceries: ShoppingBasket,
  "home-decoration": HousePlug,
  "kitchen-accessories": CookingPot,
  "sports-accessories": Dumbbell,
  "mens-shirts": Shirt,
  laptops: Laptop,
  sunglasses: HatGlasses,
};
