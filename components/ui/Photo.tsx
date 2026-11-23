import Image from 'next/image';

type PhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Layout classes for the frame (aspect ratio, size, rounding). The image fills it. */
  className?: string;
  priority?: boolean;
  /** How wide the frame renders, for picking the image size. Defaults to full width on phones, `width` px above. */
  sizes?: string;
};

/** Photo inside a `.ht` frame: soft light overlay on top, image covers the frame. Resized and re-encoded by next/image. */
export function Photo({ src, alt, width, height, className = '', priority = false, sizes }: PhotoProps) {
  return (
    <div className={`ht ${className}`}>
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes ?? `(max-width: 767px) 100vw, ${width}px`}
        draggable={false}
        preload={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </div>
  );
}
