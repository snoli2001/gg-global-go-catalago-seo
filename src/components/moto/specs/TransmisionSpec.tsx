import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface TransmisionSpecProps {
  moto: Moto;
}

const TransmisionSpec: React.FC<TransmisionSpecProps> = ({ moto }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Transmisión</h3>
      <p className="text-primary-text text-sm">
        La {moto.modelo} cuenta con una transmisión {moto.transmision.toLowerCase()}, asegurando una cómoda conducción.
      </p>
      <footer className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-caja-de-cambios text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Transmisión</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.transmision}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-radar-de-velocidad text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Velocidad Máxima</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.velocidad} km/h
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TransmisionSpec; 