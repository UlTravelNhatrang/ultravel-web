/* eslint-disable @next/next/no-img-element -- remote placeholder photos keep their exact crop and filter styling */

type PhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Layout classes for the frame (aspect ratio, size, rounding). The image fills it. */
  className?: string;
  priority?: boolean;
};

/** Photo inside a `.ht` frame: soft light overlay on top, image covers the frame. */
export function Photo({ src, alt, width, height, className = '', priority = false }: PhotoProps) {
  return (
    <div className={`ht ${className}`}>
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </div>
  );
}
