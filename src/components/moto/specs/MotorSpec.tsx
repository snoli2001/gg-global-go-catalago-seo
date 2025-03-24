import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface MotorSpecProps {
  moto: Moto;
}

const MotorSpec: React.FC<MotorSpecProps> = ({ moto }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Motor y Características</h3>
      <p className="text-primary-text text-sm">
        Cargada con un eficiente motor de {moto.cilindrada} centímetros cúbicos, lo que te dará satisfacción
        al recorrer las pistas con esta bella motocicleta.
      </p>
      <footer className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-pistons text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Cilindrada</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.cilindrada} cc
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-motor-del-coche text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Potencia</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.potencia}-hp
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-velocimetro text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Torque</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.torque} nm
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MotorSpec; 