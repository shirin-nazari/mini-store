import type { ErrorComponentProps } from "@tanstack/react-router";
import PageError from "./PageError";

const RouterError = ({ error, reset }: ErrorComponentProps) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong!";
  return <PageError message={message} onRetry={reset} />;
};

export default RouterError;
