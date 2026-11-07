const PageLoading = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] p-6 gap-3"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-100 border-t-red-800" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default PageLoading;
