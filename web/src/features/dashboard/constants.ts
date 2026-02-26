import { FileText, Folder, Lock, Timer } from "lucide-react";

export const DASHBOARD_STATS = [
  {
    icon: Folder,
    label: "Total Files",
    value: 128,
    helper: "+12% from last month",
  },
  {
    icon: FileText,
    label: "Public Files",
    value: 45,
    helper: "Available via shared links",
  },
  {
    icon: Lock,
    label: "Private Files",
    value: 83,
    helper: "Only you can access",
  },
  {
    icon: Timer,
    label: "Expiring Soon",
    value: 12,
    helper: "Expires within 48 hours",
  },
];

export type FileVisibility = "Public" | "Private";

export interface RecentFile {
  id: string;
  name: string;
  size: string;
  visibility: FileVisibility;
  expiration: string;
  expirationDate: string;
  type: "pdf" | "doc" | "sheet" | "other";
}

export const RECENT_FILES: RecentFile[] = [
  {
    id: "1",
    name: "Presentation_Q4_Final.pdf",
    size: "4.2 MB",
    visibility: "Public",
    expiration: "2 days left",
    expirationDate: "Oct 26, 2024",
    type: "pdf",
  },
  {
    id: "2",
    name: "Project_Specifications_v2.docx",
    size: "1.1 MB",
    visibility: "Private",
    expiration: "7 days left",
    expirationDate: "Oct 31, 2024",
    type: "doc",
  },
  {
    id: "3",
    name: "Budget_Forecast_2024.xlsx",
    size: "2.5 MB",
    visibility: "Public",
    expiration: "Expired",
    expirationDate: "Oct 22, 2024",
    type: "sheet",
  },
];
