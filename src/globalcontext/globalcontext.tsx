import { createContext, ReactNode, useState } from 'react';

interface TypeGlobalContext {
  setUser: (isUser: string | null) => void;
  isUser: string | null;
  isCardNumber: number | null;
  isToken: string | null;
  setToken: (isToken: string | null) => void;
  setCardNumber: (isCardNumber: number | null) => void;
}

const initialContext: TypeGlobalContext = {
  setUser: () => {},
  isUser: null,
  isCardNumber: null,
  isToken: null,
  setToken: () => {},
  setCardNumber: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUser, setUser] = useState<string | null>(null);
  const [isCardNumber, setCardNumber] = useState<number | null>(null);
  const [isToken, setToken] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
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
