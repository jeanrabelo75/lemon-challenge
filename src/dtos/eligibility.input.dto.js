import { z } from 'zod';
import {
  ConsumptionClassEnum,
  TariffModalityEnum,
  ConnectionTypeEnum,
} from '../domain/eligibility.enums.js';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const EligibilityInputSchema = z.object({
  documentNumber: z.string().refine(
    value => cpf.isValid(value) || cnpj.isValid(value),
    { message: 'Invalid CPF or CNPJ' }
  ),

  connectionType: z.enum([
    ConnectionTypeEnum.MONOPHASE,
    ConnectionTypeEnum.BIPHASE,
    ConnectionTypeEnum.TRIPHASE,
  ]),

  consumptionClass: z.enum([
    ConsumptionClassEnum.RESIDENTIAL,
    ConsumptionClassEnum.INDUSTRIAL,
    ConsumptionClassEnum.COMMERCIAL,
    ConsumptionClassEnum.RURAL,
    ConsumptionClassEnum.PUBLIC_POWER,
  ]),

  tariffModality: z.enum([
    TariffModalityEnum.CONVENTIONAL,
    TariffModalityEnum.WHITE,
    TariffModalityEnum.GREEN,
    TariffModalityEnum.BLUE,
  ]),

  consumptionHistory: z.array(z.number().int().min(0).max(9999)).min(3).max(12),
});
