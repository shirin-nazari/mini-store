type Props = {
  message?: string;
  onRetry?: () => void;
};
const PageError = ({ message = "Something went wrong!", onRetry }: Props) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 p-6 min-h-[40vh] text-center"
    >
      <p className="font-semibold text-gray-900">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-red-800 px-5 py-2 text-sm font-semibold text-white hover:bg-red-900"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default PageError;
