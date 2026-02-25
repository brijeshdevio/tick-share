import { CloudUpload } from "lucide-react";
export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-8 text-sm text-gray-600">
      <div className="mx-auto max-w-md space-y-6 text-center">
        {/* Logo and Name */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <CloudUpload className="h-5 w-5" />
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

        {/* Description */}
        <p>
          Secure, temporary file sharing made simple. Control your data
          visibility and expiration with ease.
        </p>

        {/* Links */}
        <div className="flex justify-center space-x-8 text-gray-700">
          <a href="#" className="hover:text-gray-900">
            Features
          </a>
          <a href="#" className="hover:text-gray-900">
            Pricing
          </a>
          <a href="#" className="hover:text-gray-900">
            Security
          </a>
          <a href="#" className="hover:text-gray-900">
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; 2024 TickShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
