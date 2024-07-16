import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { verifyToken } from '../api/api';

interface TypeGlobalContext {
  isId: number | null;
  setId: (id: number | null) => void;
  isCardNumber: string | null;
  setCardNumber: (cardNumber: string | null) => void;
  isUser: string | null;
  setUser: (user: string | null) => void;
  isRole: string | null;
  setRole: (role: string | null) => void;
  isLogin: boolean;
  setLogin: (loggedIn: boolean) => void;

  isErrorGlobal: string | null;
  setErrorGlobal: (error: string | null) => void;
}

const initialContext: TypeGlobalContext = {
  isId: null,
  setId: () => {},
  isCardNumber: null,
  setCardNumber: () => {},
  isUser: null,
  setUser: () => {},
  isRole: null,
  setRole: () => {},
  isLogin: false,
  setLogin: () => {},

  setErrorGlobal: () => {},
  isErrorGlobal: null,
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isId, setId] = useState<number | null>(null);
  const [isCardNumber, setCardNumber] = useState<string | null>(null);
  const [isUser, setUser] = useState<string | null>(null);
  const [isRole, setRole] = useState<string | null>(null);
  const [isLogin, setLogin] = useState<boolean>(false);

  const [isErrorGlobal, setErrorGlobal] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await verifyToken(token);
          setUser(data.nome);
          setCardNumber(data.cartao);
          setId(data.id);
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error('sem token salvo!', error);
        setLogin(false);
        localStorage.removeItem('token');
      }
    };

    loadUserFromToken();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isId,
        setId,
        isCardNumber,
        setCardNumber,
        isUser,
        setUser,
        isRole,
        setRole,
        isLogin,
        setLogin,
        isErrorGlobal,
        setErrorGlobal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
