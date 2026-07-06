/** A small dove in flight — Columbina means "little dove." */
export function DoveGlyph({
  size = 40,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M4 30c8-2 14-1 20 3 2-9 8-16 18-19-3 4-4 7-4 11 5-1 9 0 14 3-4 1-6 3-8 6 3 1 6 3 8 6-6-1-11 0-16 3-4 3-7 7-9 13-2-7-5-12-10-15-5-3-10-4-13-4l3-5-3-5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="41" cy="24" r="1.3" fill="#05060c" />
    </svg>
  );
}
