import { memo, useState } from "react";
import type { Moto } from "../../types/moto.interface";
import type { Color } from "../../types/moto.interface";
import { Image } from "astro:assets";

interface MotoCardProps {
  moto: Moto;
}

const formatPrice = (price: number, currency: string): string => {
  if (currency.toLowerCase() === "sol") {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(price);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const hasColorImage = (moto: Moto, colorId: number): boolean => {
  return moto.carrusels.some(
    (carrusel) => carrusel.type === "B" && carrusel.color_id === colorId
  );
};

const toTitleCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBannerImage = (moto: Moto): string => {
  const bannerImages = moto.carrusels.filter(
    (carrusel) => carrusel.type === "B"
  );

  for (const color of moto.colores) {
    const bannerImage = bannerImages.find(
      (img) => img.color_id === color.color_id
    );
    if (bannerImage) {
      return bannerImage.imagen;
    }
  }

  return "/imgs/moto.png";
};

const calculateMonthlyPayment = (
  price: number,
  annualInterestRate: number,
  months: number
): number => {
  const monthlyRate = annualInterestRate / 52 / 100;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return price * (numerator / denominator);
};

const getCategoryClass = (categoria: string): string => {
  const baseClasses =
    "absolute top-3 -left-3 text-sm text-white rounded-md px-2 py-1";

  const bgColorMap: Record<string, string> = {
    "Touring - Viajeras": "bg-purple-700",
    "Enduro - Cross": "bg-yellow-600",
    Deportiva: "bg-red-600",
    Pistera: "bg-green-600",
    Scooter: "bg-orange-600",
    "Doble proposito - Todo Terreno": "bg-dark",
    "Café Racer": "bg-yellow-900",
  };

  const bgColor = bgColorMap[categoria] || "bg-gray-600";
  return `${baseClasses} ${bgColor}`;
};

interface ColorCircleProps {
  color: Color;
  selected?: boolean;
  disabled?: boolean;
  size?: number;
}

const ColorCircle = ({
  color,
  selected = false,
  disabled = false,
  size = 20,
}: ColorCircleProps) => {
  return (
    <div className="relative">
      <div
        className={`rounded-full transition-transform border border-stroke ${
          !disabled ? "cursor-pointer hover:scale-110" : "opacity-30"
        } ${selected ? "ring-2 ring-gg-blue-700 ring-offset-2" : ""}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `linear-gradient(to right, ${color.hex1}, ${color.hex2})`,
        }}
      />
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-[1px] bg-gray-400 rotate-45 rounded-full" />
        </div>
      )}
    </div>
  );
};

const MotoCard = memo(function MotoCard({ moto }: MotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    const isInIframe = window !== window.parent;
    const motoCode = moto.code;

    if (isInIframe && window.top) {
      window.top.location.href = `${import.meta.env.PUBLIC_MOTO_DETAIL_URL}?codigoMoto=${motoCode}`;
      return;
    }

    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        window.location.href = `/motos/${motoCode}`;
      });
    } else {
      window.location.href = `/motos/${motoCode}`;
    }
  };

  return (
    <article
      className="border cursor-pointer border-stroke rounded-lg bg-white w-full group aspect-[11/8]"
      data-moto
      data-id={moto.idModelo}
      data-marca={moto.marca}
      data-categoria={moto.categoria}
      data-transmision={moto.transmision}
      data-precio={moto.precio}
      data-cilindrada={moto.cilindrada}
      data-rendimiento={moto.rendimiento}
      data-code={moto.code}
      onClick={handleClick}
    >
      <header className="flex relative">
        <div className="w-full aspect-[11/8] overflow-hidden px-4 pt-5 pb-3 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <img
            src={getBannerImage(moto)}
            alt={moto.modelo}
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`object-contain h-auto w-full transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ viewTransitionName: `moto-${moto.idModelo}` }}
          />
        </div>
        <div className={getCategoryClass(moto.categoria)}>
          {toTitleCase(moto.categoria)}
        </div>
        <div className="absolute top-3 right-4">
          <img
            src={moto.logo}
            alt={moto.marca}
            loading="eager"
            className="w-12 h-auto"
            style={{ viewTransitionName: `moto-marca-${moto.idModelo}` }}
          />
        </div>
      </header>

      <section className="px-4">
        <div className="flex flex-col gap-0">
          <strong className="text-2xl -mt-0.5 text-dark font-medium truncate">
            {moto.modelo}
          </strong>
        </div>

        <div className="flex justify-between items-center py-1">
          <div className="flex flex-col">
            <span className="text-2xl font-medium text-gg-blue-700">
              {moto.currency.toLowerCase() === "sol"
                ? formatPrice(moto.precio, "sol")
                : formatPrice(moto.price_dollar, "usd")}
            </span>
            <span className="text-gg-red-600 font-medium flex items-center gap-1">
              Desde{" "}
              {formatPrice(
                calculateMonthlyPayment(
                  moto.currency.toLowerCase() === "sol"
                    ? moto.precio
                    : moto.price_dollar,
                  75,
                  52
                ),
                moto.currency.toLowerCase()
              )}{" "}
              semanales
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {moto.colores
                .filter((color: Color) => hasColorImage(moto, color.color_id))
                .map((color: Color) => (
                  <div key={color.color_id} className="pointer-events-none">
                    <ColorCircle color={color} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-2 px-4 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-primary-text">Cilindrada (CS):</span>
              <span className="text-sm text-primary-text">{moto.cilindrada}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-primary-text">Rendimiento:</span>
              <span className="text-sm text-primary-text">{moto.rendimiento}</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
});

export default MotoCard; 