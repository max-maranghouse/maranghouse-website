import Image from "next/image";

type BgPhotoProps = {
  src: string;
  alt: string;
  className: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Fills its (CSS-positioned) container with a next/image, replacing the
 * original design's `style="background-image:url(...)"` divs. The container
 * class must already establish a positioning context (position: relative or
 * absolute) and a size — see globals.css for the classes this is used with.
 */
export default function BgPhoto({
  src,
  alt,
  className,
  position = "center",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: BgPhotoProps) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}
