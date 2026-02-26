import {
  Eye,
  FileText,
  FileSpreadsheet,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { DASHBOARD_STATS, RECENT_FILES } from "./constants";

{
  /* Search / hero card */
}
function Searchbar() {
  return (
    <section className="ring-base-200/70 mb-6 rounded-3xl p-6 shadow-sm ring-1 sm:p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Find and share your files instantly
          </h2>
          <p className="text-base-content/70 mx-auto max-w-2xl text-sm">
            Search through your uploaded documents, spreadsheets, and
            presentations. All links are encrypted and time-limited for your
            security.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="border-base-200 bg-base-100 flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm">
            <Search className="text-base-content/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by file name, type, or date..."
              className="input-ghost input flex-1 border-0 bg-transparent p-0 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* Stats cards */
}
function Stats() {
  return (
    <section className="mb-8 grid gap-4 md:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => (
        <article
          key={stat.label}
          className="card border-base-200 bg-base-100/80 border shadow-sm"
        >
          <div className="card-body gap-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-base-content/50 text-xs font-medium tracking-[0.18em] uppercase">
                {stat.label}
              </p>
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
                <stat.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-base-content/70 text-xs">{stat.helper}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function FileTypeIcon({
  type,
}: {
  type: (typeof RECENT_FILES)[number]["type"];
}) {
  if (type === "pdf") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-500">
        <FileText className="h-4 w-4" />
      </span>
    );
  }

  if (type === "sheet") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-500">
        <FileSpreadsheet className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-500">
      <FileText className="h-4 w-4" />
    </span>
  );
}

{
  /* Files table */
}
function Files() {
  return (
    <section className="bg-base-100 ring-base-200/70 rounded-3xl p-4 shadow-sm ring-1 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold sm:text-base">Recent Files</h3>
        </div>
        <button className="btn btn-ghost btn-xs sm:btn-sm rounded-full text-xs sm:text-sm">
          View all files
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-sm table">
          <thead>
            <tr className="text-base-content/60 text-xs">
              <th className="font-medium">File Name</th>
              <th className="font-medium">Size</th>
              <th className="font-medium">Visibility</th>
              <th className="font-medium">Expiration</th>
              <th className="text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_FILES.map((file) => (
              <tr key={file.id} className="text-xs sm:text-sm">
                <td>
                  <div className="flex items-center gap-3">
                    <FileTypeIcon type={file.type} />
                    <span className="font-medium">{file.name}</span>
                  </div>
                </td>
                <td className="text-base-content/70">{file.size}</td>
                <td>
                  <span
                    className={`badge rounded-full border-none px-3 text-xs ${
                      file.visibility === "Public"
                        ? "badge-outline bg-blue-50 text-blue-600"
                        : "badge-outline bg-slate-100 text-slate-700"
                    }`}
                  >
                    {file.visibility}
                  </span>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-medium ${
                        file.expiration === "Expired"
                          ? "text-red-500"
                          : "text-base-content"
                      }`}
                    >
                      {file.expiration}
                    </span>
                    <span className="text-base-content/60 text-[11px]">
                      {file.expirationDate}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="text-base-content/60 flex justify-end gap-2">
                    <button className="btn btn-ghost btn-xs">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost btn-xs">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost btn-xs text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-base-200/60 text-base-content">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <Searchbar />
        <Stats />
        <Files />
      </div>
    </div>
  );
}
