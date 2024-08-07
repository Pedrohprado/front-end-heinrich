export type BodyPart =
  | 'cabeça'
  | 'olhos'
  | 'mão direita'
  | 'mão esquerda'
  | 'pé direito'
  | 'pé esquerdo'
  | 'tronco'
  | 'braço direito'
  | 'braço esquerdo';

export interface TypeRegister {
  id: number;
  createdById: number;
  nome: string;
  cartao: string;
  setor: string;
  liderResponsavel: string;
  descricao: string;
  cliente: string | null;
  produto: string | null;
  nivelDoOcorrido: string;
  createdAt: Date; //ok
  updatedAt: Date;

  dataEntradaNoAmbulatorio: Date | string | null;
  enfermeiroResponsavel: string | null;
  lateralidadeDoCorpo: string | null;
  NaturezaDaLesao: string | null;
  cid: string | null;
  diasDeAtestado: number | null;
  diasDeAfastamentoReal: number | null;
  unidadeDeAtendimento: string | null;
  descricaoDoAcidente: string | null;
  dataValidacaoAmbulatorio: Date | string | null;
  validadorAmbulatorioId: null | number;

  probabilidade: number | null;
  gravidade: number | null;
  fatorRiscoAcidente: number | null;
  dataValidacaoTST: Date | string | null;
  validadorTSTId: null | number;

  BodyParts: { id: number; parte: BodyPart; registerId: number }[] | [];
  Imagens: { id: number; path: string; registerId: number }[] | [];
}

export interface OcorrenciasPorNivel {
  [key: string]: null | TypeRegister[];
}

export interface TypeCreatedRegister {
  nome: string;
  cartao: string;
  setor: string;
  liderResponsavel: string;
  nivelDoOcorrido: string;
  descricao: string;
}
