import {
  CloudUpload,
  FileCog,
  FolderSync,
  Globe2,
  Link2,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

export const HOW_IT_WORKS_STEPS = [
  {
    icon: CloudUpload,
    title: "Upload",
    description: "Securely upload your files up to 5GB in seconds.",
  },
  {
    icon: TimerReset,
    title: "Choose Expiration",
    description: "Set how long files stay online before auto-deletion.",
  },
  {
    icon: Link2,
    title: "Share Link",
    description: "Get a unique share link to send to anyone instantly.",
  },
  {
    icon: FileCog,
    title: "Manage",
    description: "Monitor, extend, or revoke access at any time.",
  },
];

export const FEATURE_CARDS = [
  {
    icon: ShieldCheck,
    title: "Secure Login",
    description:
      "Keep your data safe with high-grade encryption and secure authentication.",
  },
  {
    icon: TimerReset,
    title: "Expiration Control",
    description:
      "Decide exactly when your files disappear to keep sharing truly temporary.",
  },
  {
    icon: Globe2,
    title: "Public or Private",
    description:
      "Choose who can see your links with public shares or locked-down access.",
  },
  {
    icon: FolderSync,
    title: "Manage Your Files",
    description:
      "A powerful dashboard to review, extend, or instantly revoke any shared file.",
  },
];
