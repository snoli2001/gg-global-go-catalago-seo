import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface FrenosSpecProps {
  moto: Moto;
}

const FrenosSpec: React.FC<FrenosSpecProps> = ({ moto }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Frenos</h3>
      <footer className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-freno-de-disco text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Frenos Delanteros</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.freno_delantero}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-freno-1 text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Frenos Traseros</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.freno_posterior}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrenosSpec; 