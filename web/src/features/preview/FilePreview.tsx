import {
  Copy,
  Download,
  Flag,
  Image,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FILE_PREVIEW, TIME_REMAINING } from "./constants";
import { Button } from "@/shared/ui";

function PreviewCanvas() {
  return (
    <section className="flex-1">
      <div className="bg-base-100 ring-base-200/70 rounded-2xl shadow-sm ring-1">
        <div className="border-base-200 flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
              <Image className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{FILE_PREVIEW.name}</p>
              <p className="text-base-content/60 text-[11px]">Preview (mock)</p>
            </div>
          </div>

          <div className="text-base-content/60 flex items-center gap-1">
            <button className="btn btn-ghost btn-xs" aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button className="btn btn-ghost btn-xs" aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="btn btn-ghost btn-xs" aria-label="Full screen">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-base-200/40 mx-auto max-w-[520px] rounded-xl p-5">
            <div className="bg-base-100 ring-base-200/70 rounded-lg p-5 shadow-sm ring-1">
              <div className="space-y-3">
                <div className="bg-base-200 h-3 w-4/5 rounded" />
                <div className="bg-base-200 h-3 w-3/5 rounded" />
                <div className="bg-base-200 h-3 w-2/3 rounded" />
              </div>

              <div className="bg-base-200/40 mt-8 flex items-center justify-center rounded-lg py-16">
                <span className="bg-base-100 text-base-content/50 ring-base-200/70 flex h-10 w-10 items-center justify-center rounded-xl ring-1">
                  <Image className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-8 space-y-3">
                <div className="bg-base-200 h-3 w-5/6 rounded" />
                <div className="bg-base-200 h-3 w-2/3 rounded" />
                <div className="bg-base-200 h-3 w-3/4 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPanel() {
  return (
    <aside className="w-full max-w-md">
      <div className="space-y-4">
        {/* Details */}
        <div className="bg-base-100 ring-base-200/70 rounded-2xl p-5 shadow-sm ring-1">
          <div className="space-y-1">
            <h1 className="text-base font-semibold">{FILE_PREVIEW.name}</h1>
            <p className="text-base-content/60 text-xs">
              {FILE_PREVIEW.type} · {FILE_PREVIEW.size}
            </p>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="text-base-content/70 flex items-center justify-between">
              <span>{FILE_PREVIEW.uploadedLabel}</span>
              <span className="text-base-content font-medium">
                {FILE_PREVIEW.uploadedAt}
              </span>
            </div>
            <div className="text-base-content/70 flex items-center justify-between">
              <span>{FILE_PREVIEW.ownerLabel}</span>
              <span className="text-base-content font-medium">
                {FILE_PREVIEW.ownerName}
              </span>
            </div>
            <div className="text-base-content/70 flex items-center justify-between">
              <span>{FILE_PREVIEW.expiresInLabel}</span>
              <span className="text-warning font-medium">
                {FILE_PREVIEW.expiresIn}
              </span>
            </div>
          </div>

          <Button className="btn-primary mt-5 flex w-full items-center justify-center gap-2 rounded-xl">
            <Download className="h-4 w-4" />
            Download File
          </Button>

          <p className="text-base-content/50 mt-2 flex items-center gap-2 text-[11px]">
            <span className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
              <Info className="h-3 w-3" />
            </span>
            Securely scanned by TickShare. No viruses detected.
          </p>
        </div>

        {/* Time remaining */}
        <div className="bg-base-100 ring-base-200/70 rounded-2xl p-5 shadow-sm ring-1">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="bg-warning/15 text-warning flex h-5 w-5 items-center justify-center rounded-full">
              <span className="bg-warning h-2 w-2 rounded-full" />
            </span>
            Time Remaining
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {TIME_REMAINING.map((unit) => (
              <div
                key={unit.label}
                className="bg-base-200/50 rounded-xl px-3 py-2 text-center"
              >
                <p className="text-sm font-semibold">{unit.value}</p>
                <p className="text-base-content/60 text-[10px] tracking-[0.18em] uppercase">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>

          <div className="alert alert-warning mt-4 rounded-xl py-3 text-xs">
            <span>
              After expiration, this file will be permanently deleted from our
              servers.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-base-100 ring-base-200/70 rounded-2xl p-5 shadow-sm ring-1">
          <div className="space-y-3 text-xs">
            <button className="btn btn-ghost btn-sm text-base-content/70 w-full justify-start gap-2 rounded-xl">
              <Flag className="h-4 w-4" />
              Report this file
            </button>
            <button className="btn btn-ghost btn-sm text-base-content/70 w-full justify-start gap-2 rounded-xl">
              <Copy className="h-4 w-4" />
              Copy share link
            </button>
            <div className="text-base-content/50 pt-1 text-[11px]">
              {FILE_PREVIEW.shortLink}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function FilePreview() {
  return (
    <div className="bg-base-200/60 text-base-content min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <PreviewCanvas />
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}
