import { execute } from '../services/eligibility.service.js';

describe('Eligibility Service', () => {
  it('should return eligible = true and correct CO2 savings', () => {
    const input = {
      documentNumber: '14041737706',
      connectionType: 'biphase',
      consumptionClass: 'commercial',
      tariffModality: 'conventional',
      consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };

    const result = execute(input);

    expect(result.eligible).toBe(true);
    expect(result.annualCO2Savings).toBeCloseTo(5553.24, 2);
  });

  it('should return eligible = false and proper reasons', () => {
    const input = {
      documentNumber: '14041737706',
      connectionType: 'biphase',
      consumptionClass: 'rural',
      tariffModality: 'green',
      consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toContain('Classe de consumo não aceita');
    expect(result.ineligibilityReasons).toContain('Modalidade tarifária não aceita');
  });

  it('should return ineligible if consumption is too low for monophase', () => {
    const input = {
      documentNumber: '14041737706',
      connectionType: 'monophase',
      consumptionClass: 'residential',
      tariffModality: 'conventional',
      consumptionHistory: [100, 120, 130],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toContain('Consumo muito baixo para tipo de conexão');
  });
});
