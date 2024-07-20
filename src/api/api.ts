import { TypeValidationAmbulatory } from '../components/forms/formvalidationambulatory';
import { TypeValidationTst } from '../components/forms/formvalidationtst';
import { TypeRegisterForm } from '../page/newregister';
import { TypeRegister } from '../types/typesRegisters';

export const url: string = import.meta.env.VITE_BASE_URL_URL_API;

export const getRegisterById = async (idRegister: number | null) => {
  const token = localStorage.getItem('token');

  if (token && idRegister) {
    const response = await fetch(
      `
      ${url}/register/showuniqueregister/${idRegister}
      `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const register: TypeRegister = await response.json();

    return register;
  }
};

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

export const listAllRegisterNeedValidationByRole = async ({
  isRole,
  isId,
}: {
  isRole: string | null;
  isId: number | null;
}) => {
  if (isId && isRole)
    if (isRole === 'STAFFAMBULATORY') {
      const response = await fetch(`${url}/ambulatory/showallregister/${isId}`);
      const register: TypeRegister[] | null = await response.json();

      return register;
    }

  if (isRole === 'STAFFTST') {
    const response = await fetch(`${url}/tst/showallregister/${isId}`);
    const register: TypeRegister[] | null = await response.json();

    return register;
  }
};

export const validationByTst = async ({
  isId,
  idRegister,
  body,
}: {
  isId: number | null;
  idRegister: number | null;
  body: TypeValidationTst;
}) => {
  if (isId && idRegister) {
    console.log('teste');
    const response = await fetch(
      `${url}/tst/validationregister/${idRegister}/${isId}`,
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
  }
};

export const validationByAmbulatory = async ({
  isId,
  idRegister,
  body,
}: {
  isId: number | null;
  idRegister: number | null;
  body: TypeValidationAmbulatory;
}) => {
  const response = await fetch(
    `${url}/ambulatory/validationregister/${idRegister}/${isId}`,
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

export const createdNewRegister = async ({
  isId,
  form,
}: {
  isId: number;
  form: TypeRegisterForm;
}) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(
        `${url}/register/createnewregister/${isId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.log('erro ao criar novo registro', error);
  }
};
