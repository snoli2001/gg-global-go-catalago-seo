import { memo, useState } from "react";
import type { Moto } from "../../types/moto.interface";
import type { Color } from "../../types/moto.interface";

interface MotoCardProps {
  moto: Moto;
}

const formatPrice = (price: number, currency: string): string => {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  if (currency.toLowerCase() === "sol") {
    return new Intl.NumberFormat("es-PE", options).format(price);
  }
  return new Intl.NumberFormat("en-US", options).format(price);
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
  return Math.ceil(price * (numerator / denominator));
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
  const handleClick = () => {
    const isInIframe = window !== window.parent;
    const motoCode = moto.code;

    if (isInIframe && window.top) {
      window.top.location.href = `${
        import.meta.env.PUBLIC_MOTO_DETAIL_URL
      }?codigoMoto=${motoCode}`;
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
          <img
            src={getBannerImage(moto)}
            alt={`Moto ${moto.marca} ${moto.modelo}`}
            loading="lazy"
            width={400}
            height={300}
            className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
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
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-12 h-auto group-hover:scale-110"
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

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-medium text-gg-blue-700">
              {moto.currency.toLowerCase() === "sol"
                ? formatPrice(moto.precio, "sol")
                : formatPrice(moto.price_dollar, "usd")}
            </span>
            <div className="flex items-center gap-1.5">
              {moto.colores.map((color: Color) => (
                <div key={color.color_id} className="pointer-events-none">
                  <ColorCircle color={color} />
                </div>
              ))}
            </div>
          </div>
          <span className="text-xl text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 15l6 -6" />
              <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />
              <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />
              <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
            </svg>
            Desde {formatPrice(Number(moto.fee_amount), "sol")} semanales
          </span>
        </div>
      </section>

      <footer className="pt-2 px-4 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-primary-text">
                Cilindrada (CS):
              </span>
              <span className="text-sm text-primary-text">
                {moto.cilindrada}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-primary-text">Rendimiento:</span>
              <span className="text-sm text-primary-text">
                {moto.rendimiento}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
});

export default MotoCard;
