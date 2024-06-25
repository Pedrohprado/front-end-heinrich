import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { verifyToken } from '../api/api';

interface TypeGlobalContext {
  setUser: (user: string | null) => void;
  isUser: string | null;
  isCardNumber: string | null;
  isToken: string | null;
  isLogin: boolean;
  isId: number | null;
  setLogin: (loggedIn: boolean) => void;
  setToken: (token: string | null) => void;
  setCardNumber: (cardNumber: string | null) => void;
  setId: (id: number | null) => void;
}

const initialContext: TypeGlobalContext = {
  setUser: () => {},
  isUser: null,
  isCardNumber: null,
  isToken: localStorage.getItem('token'),
  isLogin: !!localStorage.getItem('token'),
  isId: null,
  setLogin: () => {},
  setToken: () => {},
  setCardNumber: () => {},
  setId: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUser, setUser] = useState<string | null>(null);
  const [isCardNumber, setCardNumber] = useState<string | null>(null);
  const [isToken, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [isId, setId] = useState<number | null>(null);

  const [isLogin, setLogin] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  const loadUserFromToken = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        const data = await verifyToken(token); // Implemente esta função na sua API
        console.log(data);
        setUser(data.nome);
        setCardNumber(data.cartao);
        setId(data.id);
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.error('Erro ao verificar token no frontend', error);
      setLogin(false);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  useEffect(() => {
    setLogin(!!isToken);
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
