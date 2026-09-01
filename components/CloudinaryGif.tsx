/* Native img is intentional: Next's optimizer can flatten animated GIFs. */
type CloudinaryGifProps = {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  sizes: string;
};

const uploadPrefix = "https://res.cloudinary.com/m4hqddxx/image/upload/";
const widths = [240, 480, 768, 1024];

/** Responsive native GIF delivery. f_gif preserves animation while c_limit
 * ensures no candidate can upscale a smaller source. */
export default function CloudinaryGif({ src, alt, className, width, height, sizes }: CloudinaryGifProps) {
  const path = src.startsWith(uploadPrefix)
    ? src.slice(uploadPrefix.length).replace(/^f_auto,q_auto(?::best)?\//, "")
    : src;
  const url = (candidate: number) => `${uploadPrefix}c_limit,w_${candidate}/f_gif,q_auto:best/${path}`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={url(768)} srcSet={widths.map((candidate) => `${url(candidate)} ${candidate}w`).join(", ")} sizes={sizes} width={width} height={height} alt={alt} />;
}
