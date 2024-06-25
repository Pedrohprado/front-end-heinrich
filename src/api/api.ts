export const url: string = import.meta.env.VITE_BASE_URL_URL_API;

export const loginStaff = async (
  name: string,
  card: string | number,
  password: string
) => {
  try {
    const json = {
      nome: name,
      cartao: card,
      password,
    };

    const response = await fetch(`${url}/loginstaff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('erro ao fazer login', error);
  }
};
