import { TypeCreatedRegister } from '../types/typesRegisters';

export const url: string = import.meta.env.VITE_BASE_URL_URL_API;

export const verifyToken = async (token: string) => {
  const response = await fetch(`${url}/user/token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao verificar token');
  }

  return response.json();
};

export const loginUser = async (body: {
  nome: string;
  cartao: string | number;
  password: string;
}) => {
  try {
    const response = await fetch(`${url}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('erro ao fazer login', error);
  }
};

export const createdNewRegister = async (form: TypeCreatedRegister) => {
  try {
    const response = await fetch(`${url}/createnewregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('erro ao criar novo registro', error);
  }
};
