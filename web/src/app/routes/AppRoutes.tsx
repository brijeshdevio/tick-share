import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout } from "@/app/layouts/BaseLayout";

const Home = lazy(() => import("@/features/home/Home"));
const Register = lazy(() => import("@/features/auth/pages/Register"));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
