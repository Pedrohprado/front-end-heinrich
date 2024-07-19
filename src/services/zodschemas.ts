import { z } from 'zod';

export const loginFilterSchema = z.object({
  nome: z.string().min(3, 'preencha o campo nome corretamente'),
  cartao: z.string().min(4, 'preencha o campo cartão corretamente'),
  password: z.string(),
});

export type TypeLogin = z.infer<typeof loginFilterSchema>;
