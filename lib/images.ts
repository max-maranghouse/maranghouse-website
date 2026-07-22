const CLOUDINARY_BASE = "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/";

/** Builds a Cloudinary delivery URL from a `v.../maranghouse/name.ext` path. */
export function cld(path: string) {
  return `${CLOUDINARY_BASE}${path}`;
}
