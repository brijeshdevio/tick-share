import { Link } from "react-router-dom";
import { Button, Input } from "@/shared/ui";

export default function Login() {
  return (
    <div className="text-base-content">
      <section className="container mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-stretch md:py-16">
        {/* Left: form card */}
        <div className="flex-1">
          <div className="card border-base-200 bg-base-100 mx-auto max-w-md border shadow-xl">
            <div className="card-body space-y-6 p-6 sm:p-8">
              <header className="space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Welcome back
                </h2>
                <p className="text-base-content/70 text-sm">
                  Please enter your details to sign in to your account.
                </p>
              </header>

              <form className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="name@company.com"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password_login"
                      className="text-base-content/70 text-sm font-medium"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="link-primary link-hover link font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    type="password"
                    id="password_login"
                    placeholder="••••••••"
                  />
                </div>

                <label className="text-base-content/70 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span>Remember me for 30 days</span>
                </label>

                <Button type="submit" className="btn-primary mt-2 w-full">
                  Sign in
                </Button>
              </form>

              <p className="text-base-content/70 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="link-primary link-hover link">
                  Start a 14-day free trial
                </Link>
              </p>

              <p className="text-base-content/60 mt-4 text-center text-xs">
                © {new Date().getFullYear()} TickShare Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
