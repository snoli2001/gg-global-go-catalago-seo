import React from 'react';
import type { Moto } from '../../../types/moto.interface';

interface SuspensionSpecProps {
  moto: Moto;
}

const SuspensionSpec: React.FC<SuspensionSpecProps> = ({ moto }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-dark text-xl font-medium">Suspensión</h3>
      <footer className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 mt-4">
        <div className="flex gap-2 items-center">
          <i className="flaticon-suspension text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Suspensión Delantera</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.suspension_delantero}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="flaticon-suspension-del-auto text-4xl text-dark"></i>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-dark">Suspensión Trasera</p>
            <p className="text-sm text-primary-text font-medium">
              {moto.suspension_posterior}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuspensionSpec; 