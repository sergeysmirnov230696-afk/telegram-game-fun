import { useState } from "react";

type CurrencyIconProps = {
  label: string;
  color?: string;
  size?: number;
};

const currencyCoinIds: Record<string, string> = {
  TRX: "tron",
  GRAM: "gram",
  BNB: "binancecoin",
  "BNB (BEP20)": "binancecoin",
  DOG: "dogecoin",
  DOGE: "dogecoin",
  LTC: "litecoin",
  SOL: "solana",
  POL: "polygon-ecosystem-token",
  TON: "the-open-network",

  USDT: "tether",
  "USDT (BEP20)": "tether",
  "USDT (TRC20)": "tether",
  "USDT (POLYGON)": "tether",
  "USDT (SOLANA)": "tether",
  "USDT (TON)": "tether",
};

const networkIcons: Record<string, string> = {
  BEP20: "https://coin-logos.simplr.sh/images/binancecoin/standard.png",
  TRC20: "https://coin-logos.simplr.sh/images/tron/standard.png",
  POLYGON:
    "https://coin-logos.simplr.sh/images/polygon-ecosystem-token/standard.png",
  SOLANA: "https://coin-logos.simplr.sh/images/solana/standard.png",
  TON: "https://coin-logos.simplr.sh/images/the-open-network/standard.png",
};

export function CurrencyIcon({
  label,
  color = "#666",
  size = 40,
}: CurrencyIconProps) {
  const normalizedLabel = label.trim().toUpperCase();

  const coinId = currencyCoinIds[normalizedLabel];

  const iconUrl = coinId
    ? `https://coin-logos.simplr.sh/images/${coinId}/standard.png`
    : null;

  // Определяем сеть
  const networkMatch = normalizedLabel.match(/\(([^)]+)\)/);
  const network = networkMatch?.[1] || null;

  const networkIcon = network ? networkIcons[network] : null;

  const [imageError, setImageError] = useState(false);

  const letters = normalizedLabel
    .replace(/\(.*\)/, "")
    .trim()
    .slice(0, 3);

  const networkSize = Math.max(15, size * 0.38);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      {iconUrl && !imageError ? (
        <img
          src={iconUrl}
          alt={label}
          width={size}
          height={size}
          className="h-full w-full rounded-full object-contain"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <span
          aria-hidden
          className="flex h-full w-full items-center justify-center rounded-full font-bold text-white"
          style={{
            background: color,
            fontSize: size * 0.3,
            boxShadow: "0 0 0 1px rgba(255,255,255,.15) inset",
          }}
        >
          {letters}
        </span>
      )}

      {/* Значок сети */}
      {networkIcon && (
        <span
          className="absolute bottom-[-1px] right-[-1px] flex items-center justify-center overflow-hidden rounded-full bg-white"
          style={{
            width: networkSize,
            height: networkSize,
            padding: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,.25)",
          }}
        >
          <img
            src={networkIcon}
            alt={network}
            className="h-full w-full rounded-full object-contain"
          />
        </span>
      )}
    </div>
  );
}
