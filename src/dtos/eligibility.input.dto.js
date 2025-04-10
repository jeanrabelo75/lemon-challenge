import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {
  ConsumptionClassEnum,
  TariffModalityEnum,
  ConnectionTypeEnum,
} from '../domain/eligibility.enums.js';

export const EligibilityInputDTO = z.object({
  documentNumber: z
    .string({ required_error: 'O número do documento é obrigatório' })
    .refine(value => cpf.isValid(value) || cnpj.isValid(value), {
      message: 'Documento inválido. Forneça um CPF ou CNPJ válido.',
    }),

  connectionType: z.enum(
    [ConnectionTypeEnum.MONOPHASE, ConnectionTypeEnum.BIPHASE, ConnectionTypeEnum.TRIPHASE],
    {
      errorMap: () => ({
        message: 'Tipo de conexão inválido. Use: monophase, biphase ou triphase.',
      }),
    }
  ),

  consumptionClass: z.enum(
    [
      ConsumptionClassEnum.RESIDENTIAL,
      ConsumptionClassEnum.INDUSTRIAL,
      ConsumptionClassEnum.COMMERCIAL,
      ConsumptionClassEnum.RURAL,
      ConsumptionClassEnum.PUBLIC_POWER,
    ],
    {
      errorMap: () => ({
        message:
          'Classe de consumo inválida. Valores permitidos: residential, industrial, commercial, rural, poderPublico.',
      }),
    }
  ),

  tariffModality: z.enum(
    [
      TariffModalityEnum.CONVENTIONAL,
      TariffModalityEnum.WHITE,
      TariffModalityEnum.GREEN,
      TariffModalityEnum.BLUE,
    ],
    {
      errorMap: () => ({
        message:
          'Modalidade tarifária inválida. Valores permitidos: conventional, white, green, blue.',
      }),
    }
  ),

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
});
