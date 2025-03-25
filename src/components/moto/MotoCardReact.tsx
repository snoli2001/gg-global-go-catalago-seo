import type { Moto } from "../../types/moto.interface";
import type { Color } from "../../types/moto.interface";
import MotoImage from "./MotoImage";
import env from "../../config/env";

interface Props {
  moto: Moto;
}

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

const hasColorImage = (moto: Moto, colorId: number): boolean => {
  return moto.carrusels.some(
    (carrusel) => carrusel.type === "B" && carrusel.color_id === colorId
  );
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

const formatPrice = (price: number, currency: string): string => {
  if (currency.toLowerCase() === "sol") {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(price);
  }
};

const calculateMonthlyPayment = (
  price: number,
  annualInterestRate: number,
  months: number
): number => {
  const monthlyInterestRate = annualInterestRate / 12 / 100; // Convert annual rate to monthly decimal
  const numerator =
    monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months);
  const denominator = Math.pow(1 + monthlyInterestRate, months) - 1;
  return price * (numerator / denominator);
};

const ColorCircle = ({
  color,
  selected = false,
  disabled = false,
  size = 20,
}: {
  color: Color;
  selected?: boolean;
  disabled?: boolean;
  size?: number;
}) => {
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

export default function MotoCardReact({ moto }: Props) {
  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const isInIframe = window !== window.parent;

    if (isInIframe) {
      window.top!.location.href = `${
        import.meta.env.PUBLIC_MOTO_DETAIL_URL
      }?codigoMoto=${moto.code}`;
      return;
    }

    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        window.location.href = `/motos/${moto.code}`;
      });
    } else {
      window.location.href = `/motos/${moto.code}`;
    }
  };

  const handleFinancingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const financingUrl = `${env.financingUrl}?modelo=${encodeURIComponent(
      moto.modelo
    )}&precio=${moto.precio}&codigo=${moto.code}`;
    window.open(financingUrl, "_blank");
  };

  return (
    <article
      className="border cursor-pointer border-stroke rounded-lg bg-white w-full group"
      onClick={() => handleClick()}
      data-moto-card={moto.idModelo}
    >
      <header className="flex relative">
        <div className="w-full aspect-[4/3] overflow-hidden px-4 pt-5 pb-3">
          <MotoImage
            style={{ viewTransitionName: `moto-${moto.idModelo}` }}
            className="object-contain h-auto w-full transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
            src={getBannerImage(moto)}
            alt={moto.modelo}
            width={400}
            height={300}
          />
        </div>
        <div className={getCategoryClass(moto.categoria)}>
          {toTitleCase(moto.categoria)}
        </div>
        <div className="absolute top-3 right-4">
          <MotoImage
            style={{ viewTransitionName: `moto-marca-${moto.idModelo}` }}
            src={moto.logo}
            alt={moto.marca}
            className="w-12 h-auto"
            width={48}
            height={48}
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
                  20,
                  24
                ),
                moto.currency.toLowerCase()
              )}{" "}
              al mes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {moto.colores
                .filter((color) => hasColorImage(moto, color.color_id))
                .map((color) => (
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
          <button
            onClick={handleFinancingClick}
            className="w-full py-2 px-4 bg-gg-blue-500 hover:bg-gg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
              />
            </svg>
            Solicitar Financiamiento
          </button>
        </div>
      </footer>
    </article>
  );
}
