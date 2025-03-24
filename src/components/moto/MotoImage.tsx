interface MotoImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MotoImage({ src, alt, width, height, className, style }: MotoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading="eager"
      decoding="async"
    />
  );
} 