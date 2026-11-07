import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-red-800">404</p>
      <h1 className="text-xl font-bold text-gray-900">Page Not Found</h1>
      <p className="text-sm text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-3 rounded-lg bg-red-800 px-6 py-3 text-sm font-semibold text-white hover:bg-red-900"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
