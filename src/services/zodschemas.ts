import { z } from 'zod';

export const loginFilterSchema = z.object({
  nome: z.string().min(3, 'preencha o campo nome'),
  cartao: z.string().min(4, '"cartão" deve conter 4 caracteres'),
  password: z.string().min(1, 'preencha o campo senha'),
});

export type TypeLogin = z.infer<typeof loginFilterSchema>;
