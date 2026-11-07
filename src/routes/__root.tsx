import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
