import { z } from 'zod';

export const EligibilitySuccessSchema = z.object({
  eligible: z.literal(true),
  annualCO2Savings: z.number().min(0),
});

export const EligibilityFailureSchema = z.object({
  eligible: z.literal(false),
  ineligibilityReasons: z.array(
    z.enum([
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
      'Consumo muito baixo para tipo de conexão',
    ])
  ),
});

export const EligibilityOutputSchema = z.union([
  EligibilitySuccessSchema,
  EligibilityFailureSchema,
]);
