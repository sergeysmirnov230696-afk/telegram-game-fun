export function CurrencyIcon({
  label,
  color,
  size = 40,
}: {
  label: string;
  color: string;
  size?: number;
}) {
  const letters = label.replace(/\(.*\)/, "").trim().slice(0, 3).toUpperCase();
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.3,
        boxShadow: "0 0 0 1px oklch(1 0 0 / 0.14) inset",
      }}
    >
      {letters}
    </span>
  );
}
