import React, { useState } from "react";
import type { Moto } from "../../../types/moto.interface";
import MotorSpec from "./MotorSpec";
import CombustibleSpec from "./CombustibleSpec";
import SuspensionSpec from "./SuspensionSpec";
import DimensionesSpec from "./DimensionesSpec";
import FrenosSpec from "./FrenosSpec";
import TransmisionSpec from "./TransmisionSpec";

interface SpecsSectionProps {
  moto: Moto;
}

interface SpecItem {
  icon: string;
  label: string;
  component: React.FC<{ moto: Moto }>;
}

const SpecsSection: React.FC<SpecsSectionProps> = ({ moto }) => {
  const specs: SpecItem[] = [
    {
      icon: "flaticon-motor-del-coche",
      label: "Motor",
      component: MotorSpec,
    },
    {
      icon: "flaticon-combustible",
      label: "Combustible",
      component: CombustibleSpec,
    },
    {
      icon: "flaticon-suspension",
      label: "Suspensión",
      component: SuspensionSpec,
    },
    {
      icon: "flaticon-caja-de-cambios",
      label: "Transmisión",
      component: TransmisionSpec,
    },
    {
      icon: "flaticon-expansion",
      label: "Dimensiones",
      component: DimensionesSpec,
    },
    {
      icon: "flaticon-freno-de-disco",
      label: "Frenos",
      component: FrenosSpec,
    },
  ];

  const [selectedSpec, setSelectedSpec] = useState<SpecItem>(specs[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[500px]">
      <div className="flex-1">
        <div className="grid grid-cols-3  bg-slate-800">
          {specs.map((spec) => (
            <button
              key={spec.label}
              className={`flex cursor-pointer flex-col items-center p-3 py-5 transition-all duration-200 hover:bg-slate-700 ${
                selectedSpec === spec ? "bg-slate-600" : ""
              }`}
              onClick={() => setSelectedSpec(spec)}
            >
              <i
                className={`${spec.icon} sm:text-base md:text-2xl lg:text-3xl text-white`}
              ></i>
              <span className="text-white text-base">{spec.label}</span>
            </button>
          ))}
        </div>
        <div className="w-full px-4 py-6">
          {selectedSpec ? (
            <selectedSpec.component moto={moto} />
          ) : (
            <p>Selecciona una especificación para ver su contenido</p>
          )}
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/3 h-96 justify-center items-start">
        <img
          src="/imgs/chispa.png"
          alt="Global Go | Chispa"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SpecsSection;
