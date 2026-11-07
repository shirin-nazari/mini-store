import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Tag } from "lucide-react";

type CategoryCardProps = {
  slug: string;
  name: string;
  icon?: LucideIcon;
  iconBg?: string;
};
const CategoryCard = ({
  slug,
  name,
  icon: Icon = Tag,
  iconBg = "bg-rose-50",
}: CategoryCardProps) => (
  <Link
    to="/category/$slug"
    params={{ slug }}
    className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-6 transition hover:shadow-md"
  >
    <div
      className={`flex w-14 h-14 items-center justify-center rounded-full ${iconBg}`}
    >
      <Icon size={28} className="text-red-700" />
    </div>
    <span className="text-center text-sm font-medium text-gray-800">
      {name}
    </span>
  </Link>
);

export default CategoryCard;
