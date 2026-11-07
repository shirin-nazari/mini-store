import { ChevronRight, ChevronLeft } from "lucide-react";
type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};
const getPages = (page: number, total: number) => {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
};
const Pagination = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  const base =
    "flex h-8 w-8 items-center justify-center rounded-full text-sm transition";
  const idle = "bg-rose-50 text-gray-600 hover:bg-rose-100";
  const activeCls = "bg-red-800 font-semibold text-white";
  const arrow = `${base} ${idle} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-rose-50`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Pervious Page"
        className={arrow}
      >
        <ChevronLeft size={16} />
      </button>
      {getPages(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${p === page ? activeCls : idle}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next Page"
        className={arrow}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
