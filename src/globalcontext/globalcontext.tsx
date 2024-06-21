import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { verificToken } from '../api/api';

interface TypeGlobalContext {
  setUser: (isUser: string | null) => void;
  isUser: string | null;
  isCardNumber: number | null;
  isToken: string | null;
  isLogin: boolean;
  isId: number | null;
  setLogin: (isLogin: boolean) => void;
  setToken: (isToken: string | null) => void;
  setCardNumber: (isCardNumber: number | null) => void;
  setId: (isId: number | null) => void;
}

const initialContext: TypeGlobalContext = {
  setUser: () => {},
  isUser: null,
  isCardNumber: null,
  isToken: null,
  isLogin: false,
  isId: null,
  setLogin: () => {},
  setToken: () => {},
  setCardNumber: () => {},
  setId: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUser, setUser] = useState<string | null>(null);
  const [isCardNumber, setCardNumber] = useState<number | null>(null);
  const [isToken, setToken] = useState<string | null>(null);
  const [isId, setId] = useState<number | null>(null);

  const [isLogin, setLogin] = useState<boolean>(false);

  useEffect(() => {
    async function verifc() {
      const token = await verificToken();
      if (token) setLogin(true);
      else setLogin(false);
    }

    verifc();
  }, []);

  useEffect(() => {
    if (isToken) {
      setLogin(true);
      console.log('logado');
    }
    if (!isToken) setLogin(false);
  }, [isToken]);

  return (
    <GlobalContext.Provider
      value={{
        isId,
        setId,
        isLogin,
        setLogin,
        isUser,
        setUser,
        isCardNumber,
        setCardNumber,
        isToken,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
