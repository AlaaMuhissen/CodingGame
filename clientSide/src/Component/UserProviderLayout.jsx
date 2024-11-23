import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './UserContext';


const UserProviderLayout = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default UserProviderLayout;