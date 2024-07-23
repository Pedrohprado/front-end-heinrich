import { z } from 'zod';

export const loginFilterSchema = z.object({
  nome: z.string().min(3, 'preencha o campo nome'),
  cartao: z.string().min(4, '"cartão" deve conter 4 caracteres'),
  password: z.string().min(1, 'preencha o campo senha'),
});

export const validationFormSchemaByTst = z.object({
  probabilidade: z.coerce.number().max(5),
  gravidade: z.coerce.number().max(5),
  fatorRiscoAcidente: z.number().optional(),
});

export const validationFormSchemaByAmbulatory = z.object({
  dataEntradaNoAmbulatorio: z.string(),
  enfermeiroResponsavel: z.string().min(4, 'informe o(a) enfermeiro(a)'),
  parteDoCorpoAtingida: z.string(),
  lateralidadeDoCorpo: z.string(),
  NaturezaDaLesao: z.string(),
  cid: z.string().min(2),
  diasDeAtestado: z.coerce.number(),
  diasDeAfastamentoReal: z.coerce.number(),
  unidadeDeAtendimento: z.string(),
  nivelDoOcorrido: z.string(),
  descricaoDoAcidente: z.string().min(10),
});

export type TypeLogin = z.infer<typeof loginFilterSchema>;

export type TypeValidationTst = z.infer<typeof validationFormSchemaByTst>;

export type TypeValidationAmbulatory = z.infer<
  typeof validationFormSchemaByAmbulatory
>;
