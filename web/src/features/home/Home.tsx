import {
  ArrowRight,
  Link2,
  Lock,
  ShieldCheck,
  TimerReset,
  Users,
} from "lucide-react";
import { FEATURE_CARDS, HOW_IT_WORKS_STEPS } from "./constants";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

{
  /* Hero section */
}
function HeroSection() {
  return (
    <section className="from-base-100 to-base-200/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 lg:gap-16">
        <div className="flex-1 space-y-6">
          <p className="border-primary/10 bg-primary/5 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
            <span className="bg-primary h-2 w-2 rounded-full" />
            Share files that auto-expire
          </p>
          <h1 className="text-base-content text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Share Files.
            <br />
            <span className="text-primary">Set Expiration.</span>
            <br />
            Stay in Control.
          </h1>
          <p className="text-base-content/70 max-w-xl text-sm sm:text-base">
            Upload files up to 5GB and decide exactly how long they stay
            available. Simple, secure, and built for temporary sharing.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/dashboard">
              <Button className="btn-primary gap-2 px-6 text-sm sm:text-base">
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button className="btn btn-ghost border-base-300 bg-base-100/60 px-6 text-sm sm:text-base">
              Learn More
            </Button>
          </div>

          <div className="text-base-content/60 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary h-4 w-4" />
              <span>End-to-end encrypted links</span>
            </div>
            <div className="flex items-center gap-2">
              <TimerReset className="text-primary h-4 w-4" />
              <span>Auto-expire from 10 minutes to 7 days</span>
            </div>
          </div>
        </div>

        {/* Hero card mock */}
        <div className="flex-1">
          <div className="bg-base-100 shadow-primary/10 ring-base-200 mx-auto max-w-md rounded-3xl p-6 shadow-2xl ring-1 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-base-content/40 text-xs font-medium tracking-[0.18em] uppercase">
                  Active Share
                </p>
                <p className="text-lg font-semibold">Project-files.zip</p>
              </div>
              <span className="badge badge-primary badge-lg rounded-full border-none">
                1.9 GB
              </span>
            </div>

            <div className="text-base-content/60 mb-5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Expires in</span>
                <span className="text-base-content font-medium">23 hours</span>
              </div>
              <progress
                className="progress progress-primary bg-base-200 h-2"
                value={40}
                max={100}
              />
            </div>

            <div className="bg-base-200/60 mb-4 space-y-3 rounded-2xl p-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="text-primary h-4 w-4" />
                  <span className="text-base-content font-medium">
                    18 people viewed
                  </span>
                </div>
                <span className="text-base-content/60">Last 24 hours</span>
              </div>
              <div className="text-base-content/70 flex items-center justify-between">
                <span>Access</span>
                <span className="inline-flex items-center gap-1">
                  <Lock className="text-success h-3 w-3" />
                  Private link
                </span>
              </div>
            </div>

            <Button className="btn btn-primary btn-block gap-2 rounded-2xl">
              Copy Share Link
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* How it works */
}
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-base-200 bg-base-100 border-t">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How It Works
          </h2>
          <p className="text-base-content/70 mt-2 text-sm sm:text-base">
            Simplified file sharing in four easy steps.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.title}
              className="card border-base-200 bg-base-100/80 border shadow-sm"
            >
              <div className="card-body items-start gap-4 p-5">
                <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold sm:text-base">
                  {step.title}
                </h3>
                <p className="text-base-content/70 text-xs sm:text-sm">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

{
  /* Features */
}
function FeaturesSection() {
  return (
    <section id="features" className="bg-base-200/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Features
            </h2>
            <p className="text-base-content/70 mt-2 max-w-xl text-sm sm:text-base">
              Everything you need to manage your temporary file sharing
              securely.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((feature) => (
            <article
              key={feature.title}
              className="card border-base-200 bg-base-100 border shadow-sm"
            >
              <div className="card-body gap-4 p-5">
                <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

{
  /* CTA section */
}
function CTASection() {
  return (
    <section
      id="pricing"
      className="border-base-200 bg-primary text-primary-content border-y"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to start sharing?
        </h2>
        <p className="text-primary-content/80 max-w-xl text-sm sm:text-base">
          Join thousands of teams using TickShare for secure, temporary file
          sharing. No credit card required.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button className="btn btn-primary btn-wide bg-primary-content text-primary rounded-full border-none px-6 text-sm sm:text-base">
            Create Free Account
          </Button>
          <Button className="btn btn-outline btn-primary-content border-primary-content/40 bg-primary/40 rounded-full px-6 text-sm sm:text-base">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
