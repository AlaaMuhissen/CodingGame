import React from 'react';
import { PointProvider } from './PointContext';
import { Outlet } from 'react-router-dom';


const PointProviderLayout = () => {
  return (
    <PointProvider>
      <Outlet />
    </PointProvider>
  );
};

export default PointProviderLayout;