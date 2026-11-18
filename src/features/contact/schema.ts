import { z } from "zod";
import { contactContent } from "@/content/home";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome com pelo menos 2 caracteres.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),
  email: z
    .string()
    .trim()
    .email("Informe um endereço de e-mail válido.")
    .max(160, "O e-mail deve ter no máximo 160 caracteres."),
  company: z
    .string()
    .trim()
    .max(120, "O nome da empresa deve ter no máximo 120 caracteres.")
    .optional()
    .or(z.literal("")),
  solutionType: z.enum(contactContent.solutionTypes, {
    message: "Selecione o tipo de solução.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Descreva o projeto com pelo menos 20 caracteres.")
    .max(2000, "A descrição deve ter no máximo 2000 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
