type CurrencyIconProps = {
  label: string;
  color?: string;
  size?: number;
};

// CoinGecko IDs
const currencyCoinIds: Record<string, string> = {
  TRX: "tron",
  TON: "the-open-network",
  BNB: "binancecoin",
  DOG: "dogecoin",
  DOGE: "dogecoin",
  LTC: "litecoin",
  SOL: "solana",
  POL: "polygon-ecosystem-token",

  "USDT (BEP20)": "tether",
  "USDT (Polygon)": "tether",
  "USDT (Solana)": "tether",
  "USDT (TON)": "tether",

  USDT: "tether",
};

export function CurrencyIcon({
  label,
  color = "#666",
  size = 40,
}: CurrencyIconProps) {
  const normalizedLabel = label.trim().toUpperCase();

  const coinId = currencyCoinIds[normalizedLabel];

  // CDN с логотипами CoinGecko
  const iconUrl = coinId
    ? `https://coin-logos.simplr.sh/images/${coinId}/standard.png`
    : null;

  const letters = normalizedLabel
    .replace(/\(.*\)/, "")
    .trim()
    .slice(0, 3);

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={label}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-contain"
        loading="lazy"
        onError={(e) => {
          // Если CDN недоступен — показываем запасной вариант
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) {
            fallback.style.display = "inline-flex";
          }
        }}
      />
    );
  }

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
