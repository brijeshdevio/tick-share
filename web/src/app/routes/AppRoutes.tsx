import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout } from "@/app/layouts/BaseLayout";
import { Loader } from "@/shared/ui";

const Home = lazy(() => import("@/features/home/Home"));
const Register = lazy(() => import("@/features/auth/pages/Register"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Upload = lazy(() => import("@/features/upload/Upload"));
const FilePreview = lazy(() => import("@/features/preview/FilePreview"));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader className="h-screen" />}>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/preview" element={<FilePreview />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
