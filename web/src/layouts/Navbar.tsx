import { useState } from "react";
import { Link } from "react-router-dom";
import { CloudUpload, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/shared/constants";
import { Button } from "@/shared/ui";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100/70 sticky top-0 z-50 w-full rounded-b-xl border-b border-white/10 p-3 bg-blend-hard-light shadow backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between md:container">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <CloudUpload className="h-6 w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-semibold tracking-tight">
                TickShare
              </span>
              <span className="text-base-content/50 text-[11px] font-medium tracking-[0.18em] uppercase">
                Temporary File Sharing
              </span>
            </span>
          </div>
        </Link>

        <div className="hidden space-x-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-primary text-sm opacity-80 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center space-x-6 md:flex">
          <Link
            to={"/login"}
            className="hover:text-primary text-sm opacity-80 hover:opacity-100"
          >
            Login
          </Link>
          <Link to={"/register"}>
            <Button className="btn-primary btn-md text-sm">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 dropdown-open:text-base-content"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="mt-3 md:hidden">
          <div className="flex flex-col space-y-2">
            <Link to={"/login"} onClick={() => setIsOpen(false)}>
              <Button className="btn-ghost btn-md w-full text-sm">Login</Button>
            </Link>
            <Link to={"/register"} onClick={() => setIsOpen(false)}>
              <Button className="btn-primary btn-md w-full text-sm">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
