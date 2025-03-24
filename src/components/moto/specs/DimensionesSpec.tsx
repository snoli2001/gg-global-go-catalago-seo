import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface DimensionesSpecProps {
  moto: Moto;
}

const DimensionesSpec: React.FC<DimensionesSpecProps> = ({ moto }) => {
  const getMotorcycleDimensionDescription = (): string => {
    const { largo, ancho } = moto;

    if (!largo || !ancho) {
      return 'Dimensiones no disponibles.';
    }

    const largoNum = parseInt(largo);
    const anchoNum = parseInt(ancho);

    if (anchoNum < 80) {
      return 'Una moto de reducidas dimensiones, ideal para moverse por la ciudad a cortas y medianas distancias.';
    }

    if (largoNum >= 180 && largoNum <= 220 && anchoNum >= 60 && anchoNum <= 80) {
      return 'Una moto de tamaño mediano, versátil y adecuada para diferentes tipos de terreno.';
    }

    if (largoNum > 220 || anchoNum > 80) {
      return 'Una moto de grandes dimensiones, ideal para recorrer largas distancias con comodidad, perfecta para aventuras en carretera.';
    }

    return 'Una moto con dimensiones estándar, adaptable a cualquier uso.';
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Dimensiones</h3>
      <p className="text-primary-text text-sm">
        {getMotorcycleDimensionDescription()}
      </p>
      <footer className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-peso text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Peso</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.peso} kg
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-expansion text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Dimensiones</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.largo} x {moto.ancho} (lxa)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DimensionesSpec; 