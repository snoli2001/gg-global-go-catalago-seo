import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface CombustibleSpecProps {
  moto: Moto;
}

const CombustibleSpec: React.FC<CombustibleSpecProps> = ({ moto }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Combustible</h3>
      <p className="text-primary-text text-sm">
        Motor eficiente con una autonomía de {moto.autonomia} km. La {moto.modelo} tiene una cilindrada de {moto.cilindrada} cc y una potencia de {moto.potencia} hp.
      </p>
      <footer className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-combustible text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Combustible</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.combustible}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-gas-tank text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Tanque</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.tanque} litros
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-velocimetro text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Rendimiento</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.rendimiento} km/gal
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-bajo-rendimiento text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Autonomía</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.autonomia} km
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CombustibleSpec; 