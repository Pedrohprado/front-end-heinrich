import { TypeValidationAmbulatory } from '../components/forms/formvalidationambulatory';
import { TypeValidationTst } from '../components/forms/formvalidationtst';
import { TypeCreatedRegister, TypeRegister } from '../types/typesRegisters';

export const url: string = import.meta.env.VITE_BASE_URL_URL_API;

export const listRegisterByUser = async (userId: number | null) => {
  const token = localStorage.getItem('token');

  if (token && userId) {
    const response = await fetch(
      `${url}/register/showregisterbyuser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: TypeRegister[] = await response.json();

    return data.reverse();
  }
};

export const listRegisterNeedValidationTst = async (userId: number) => {
  const response = await fetch(`${url}/tst/showallregister/${userId}`);
  const register = await response.json();

  return register;
};

export const listRegisterNeedValidationAmbulatory = async (userId: number) => {
  const response = await fetch(`${url}/ambulatory/showallregister/${userId}`);

  const listOfRegister = await response.json();

  return listOfRegister;
};

export const validationByTst = async (
  userId: number,
  registerId: number,
  body: TypeValidationTst
) => {
  const response = await fetch(
    `${url}/tst/validationregister/${registerId}/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const infoValidation = await response.json();
  return infoValidation;
};

export const validationByAmbulatory = async (
  userId: number,
  registerId: number,
  body: TypeValidationAmbulatory
) => {
  const response = await fetch(
    `${url}/ambulatory/validationregister/${registerId}/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const infoValidation = await response.json();

  return infoValidation;
};

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

export const createdNewRegister = async (
  isId: number,
  token: string,
  form: TypeCreatedRegister
) => {
  try {
    const response = await fetch(`${url}/register/createnewregister/${isId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
