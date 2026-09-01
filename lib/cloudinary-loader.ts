import type { ImageLoaderProps } from "next/image";

const UPLOAD_PREFIX = "https://res.cloudinary.com/m4hqddxx/image/upload/";

/** Lets Next's width srcset drive Cloudinary resizing without upscaling. */
export default function cloudinaryLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith(UPLOAD_PREFIX) || src.includes("/f_png,")) return src;
  const sourcePath = src.slice(UPLOAD_PREFIX.length).replace(/^f_auto,q_auto(?::best)?\//, "");
  return `${UPLOAD_PREFIX}c_limit,w_${width}/f_auto,q_auto:best/${sourcePath}`;
}
