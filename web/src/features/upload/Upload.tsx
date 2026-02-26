import { useState } from "react";
import { UploadCloud, Info } from "lucide-react";
import { Button, Input, Select, Textarea, Toggle } from "@/shared/ui";
import { EXPIRATION_OPTIONS } from "./constants";

export default function Upload() {
  const [visibility, setVisibility] = useState("public");
  return (
    <div className="bg-base-200/60 text-base-content">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        {/* Page header */}
        <header className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Upload File
          </h1>
          <p className="text-base-content/70 text-sm">
            Share your files securely and quickly with expiration control.
          </p>
        </header>

        {/* Main card */}
        <section className="bg-base-100 ring-base-200/70 rounded-3xl p-5 shadow-sm ring-1 sm:p-7">
          {/* Dropzone */}
          <div className="border-base-300 bg-base-100/60 mb-8 rounded-2xl border-2 border-dashed p-8 text-center">
            <div className="mb-4 flex justify-center">
              <span className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                <UploadCloud className="h-6 w-6" />
              </span>
            </div>
            <h2 className="mb-1 text-sm font-semibold sm:text-base">
              Drop your file here, max size: 5MB
            </h2>
            <p className="text-base-content/70 mb-4 text-xs sm:text-sm">
              Drag and drop files or click the button below to browse.
            </p>
            <Button className="btn-primary px-6 text-sm">Browse File</Button>
          </div>

          {/* File metadata */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                <Info className="h-3 w-3" />
              </span>
              <span>File Metadata</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="File Name"
                placeholder="e.g. Project_Presentation.pdf"
                className="input-bordered w-full rounded-full"
              />

              <div className="flex flex-col gap-2">
                <Toggle
                  label="Visibility"
                  value={visibility}
                  onChange={setVisibility}
                  options={[
                    { label: "Public", value: "public" },
                    { label: "Private", value: "private" },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Select label="Expiration Time" options={EXPIRATION_OPTIONS} />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  label="Short Link (Auto-generated)"
                  placeholder="tickshare.com/s/..."
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Textarea
                label="Description (Optional)"
                placeholder="Tell recipients more about this file..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="text-base-content/60 flex flex-wrap gap-4 text-xs">
                <span>End-to-end encrypted</span>
                <span>Auto-deletion enabled</span>
              </div>
              <Button className="btn-primary btn-md flex items-center gap-2 rounded-full px-6 text-sm">
                Upload File
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
