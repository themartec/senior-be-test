export const IMAGE_MIME_TYPES: Set<string> = new Set([
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/webp",
  "image/tiff",
  "image/svg+xml",
  "image/heif",
  "image/heic",
]);

export const VIDEO_MIME_TYPES: Set<string> = new Set([
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/avi",
  "video/mkv",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/x-flv",
]);

export const STATIC_ASSET_URL = `${BACKEND_HOST}/assets/public/files/`;
