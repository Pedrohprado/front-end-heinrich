import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';

const ProtectRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLogin } = useContext(GlobalContext);

  if (isLogin) return children;
  else return <Navigate to={'/login'} />;
};

export default ProtectRouter;
