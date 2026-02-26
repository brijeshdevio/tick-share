import { Outlet } from "react-router-dom";
import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
