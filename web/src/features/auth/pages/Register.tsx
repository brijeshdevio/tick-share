import { Link } from "react-router-dom";
import { REGISTER_FEATURES } from "@/features/auth/constants";
import { Button, Input } from "@/shared/ui";

function Form() {
  return (
    <div className="flex-1">
      <div className="card border-base-200 bg-base-100 mx-auto max-w-md border shadow-xl">
        <div className="card-body space-y-6 p-6 sm:p-8">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Create Account
            </h2>
            <p className="text-base-content/70 text-sm">
              Enter your details to get started.
            </p>
          </header>

          <form className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
            />
            <Input label="Password" type="password" placeholder="*******" />

            <Button type="submit" className="btn-primary w-full">
              Create Account
            </Button>
          </form>
          <p className="text-base-content/70 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link-primary link-hover link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <div className="text-base-content">
      <section className="container mx-auto flex min-h-[70vh] max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 space-y-6">
          <p className="text-primary text-xs font-medium tracking-[0.18em] uppercase">
            Create your TickShare account
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Join the future of <span className="text-primary">secure</span> file
            sharing.
          </h1>
          <p className="text-base-content/70 max-w-xl text-sm sm:text-base">
            Start sharing your files with complete control and peace of mind.
            TickShare lets you set expirations, manage access, and delete files
            anytime.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {REGISTER_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-base-100/80 ring-base-200/70 flex items-start gap-3 rounded-2xl p-3 shadow-sm ring-1"
              >
                <span className="bg-primary/10 text-primary mt-1 flex h-9 w-9 items-center justify-center rounded-xl">
                  <feature.icon className="h-4 w-4" />
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="text-base-content/70 text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form card */}
        <Form />
      </section>
    </div>
  );
}
