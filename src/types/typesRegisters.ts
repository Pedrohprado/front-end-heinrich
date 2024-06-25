export interface TypeRegister {
  cartao: string;
  createdAt: Date;
  dataValidacao: Date | null;
  descricao: string;
  id: number;
  liderResponsavel: string;
  nivelDoOcorrido: string;
  nome: string;
  setor: string;
  updatedAt: Date;
  validadorId: number | null;
}

export interface TypeCreatedRegister {
  nome: string;
  cartao: string;
  setor: string;
  liderResponsavel: string;
  nivelDoOcorrido: string;
  descricao: string;
}
