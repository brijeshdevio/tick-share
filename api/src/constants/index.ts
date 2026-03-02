export const PRISMA_ERROR_CODES = {
  CONFLICT: "P2002",
  NOT_FOUND: "P2025",
};

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

export const COOKIE_NAME = {
  ACCESS_TOKEN: "access_token",
};

export const COOKIE_EXPIRES = {
  ACCESS_TOKEN: 3 * 24 * 60 * 60 * 1000,
};

export const MESSAGES = {
  USER_CREATION_SUCCESS: "User created successfully.",
  USER_LOGIN_SUCCESS: "User logged in successfully.",
  USER_LOGOUT_SUCCESS: "User logged out successfully.",
  UNAUTHORIZED: "You are not logged in. Please login to continue.",
  FILE_UPLOAD_SUCCESS: "File uploaded successfully.",
  FILE_DELETE_SUCCESS: "File deleted successfully.",
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_MIME_TYPES = {
  image: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ],
  video: ["video/mp4", "video/webm", "video/ogg"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
  ],
};
