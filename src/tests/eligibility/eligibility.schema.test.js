import { EligibilityInputSchema } from '../../dtos/eligibility.input.dto.js';

describe('EligibilityInputSchema', () => {
  it('should reject invalid document number', () => {
    const result = EligibilityInputSchema.safeParse({
      documentNumber: '12345678900',
      connectionType: 'biphase',
      consumptionClass: 'commercial',
      tariffModality: 'conventional',
      consumptionHistory: [1000, 2000, 3000],
    });

    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toMatch(/Documento inválido/);
  });

  it('should accept valid input data', () => {
    const result = EligibilityInputSchema.safeParse({
      documentNumber: '21554495008',
      connectionType: 'biphase',
      consumptionClass: 'commercial',
      tariffModality: 'conventional',
      consumptionHistory: [1000, 2000, 3000],
    });

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.documentNumber).toBe('21554495008');
  });
});
