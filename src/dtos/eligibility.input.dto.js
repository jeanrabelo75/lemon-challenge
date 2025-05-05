import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {
  ConsumptionClasses,
  TariffModalities,
  ConnectionTypes,
} from '../domain/eligibility.enums.js';

const consumptionClassNames = ConsumptionClasses.map(c => c.name);
const consumptionSubClassNames = ConsumptionClasses.flatMap(c => c.subclasses);
const tariffModalityNames = TariffModalities.map(t => t.name);
const connectionTypeNames = Object.keys(ConnectionTypes);

export const EligibilityInputDTO = z.object({
  documentNumber: z
    .string({ required_error: 'O número do documento é obrigatório' })
    .refine(value => cpf.isValid(value) || cnpj.isValid(value), {
      message: 'Documento inválido. Forneça um CPF ou CNPJ válido.',
    }),

  connectionType: z
    .string({ required_error: 'Tipo de conexão é obrigatório' })
    .refine(val => connectionTypeNames.includes(val), {
      message: 'Tipo de conexão inválido. Use: monophase, biphase ou triphase.',
    }),

  consumptionClass: z
    .string({ required_error: 'Classe de consumo é obrigatória' })
    .refine(val => consumptionClassNames.includes(val), {
      message:
        'Classe de consumo inválida. Valores permitidos: residential, industrial, commercial, rural, publicPower.',
    }),

  tariffModality: z
    .string({ required_error: 'Modalidade tarifária é obrigatória' })
    .refine(val => tariffModalityNames.includes(val), {
      message:
        'Modalidade tarifária inválida. Valores permitidos: conventional, white, green, blue.',
    }),

  consumptionHistory: z
    .array(
      z
        .number({
          invalid_type_error: 'Os valores de consumo devem ser números inteiros',
        })
        .int()
        .min(0, { message: 'Valores de consumo não podem ser negativos' })
        .max(9999, { message: 'Valores de consumo não podem exceder 9999' })
    )
    .min(3, { message: 'O histórico de consumo deve conter no mínimo 3 valores' })
    .max(12, { message: 'O histórico de consumo deve conter no máximo 12 valores' }),

  consumptionSubClass: z
    .string({ required_error: 'Subclasse de consumo é obrigatória' })
    .refine(val => consumptionSubClassNames.includes(val), {
      message: 'Subclasse de consumo inválida.',
    }),
});
