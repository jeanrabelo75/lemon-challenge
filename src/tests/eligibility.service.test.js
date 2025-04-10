import { execute } from '../services/eligibility.service.js';

describe('Eligibility Service', () => {
  it('should return eligible = true and correct CO2 savings', () => {
    const input = {
      documentNumber: '14041737706',
      connectionType: 'biphase',
      consumptionClass: 'commercial',
      tariffModality: 'conventional',
      consumptionHistory: [
        3878, 9760, 5976, 2797, 2481, 5731,
        7538, 4392, 7859, 4160, 6941, 4597,
      ],
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
      consumptionHistory: [
        3878, 9760, 5976, 2797, 2481,
        5731, 7538, 4392, 7859, 4160,
      ],
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

  it('should be ineligible due to invalid consumption class only', () => {
    const input = {
      documentNumber: '21554495008',
      connectionType: 'biphase',
      consumptionClass: 'rural',
      tariffModality: 'conventional',
      consumptionHistory: [500, 600, 700],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toContain('Classe de consumo não aceita');
    expect(result.ineligibilityReasons).toHaveLength(1);
  });

  it('should be ineligible due to invalid tariff modality only', () => {
    const input = {
      documentNumber: '21554495008',
      connectionType: 'biphase',
      consumptionClass: 'commercial',
      tariffModality: 'green',
      consumptionHistory: [500, 600, 700],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toContain('Modalidade tarifária não aceita');
    expect(result.ineligibilityReasons).toHaveLength(1);
  });

  it('should be ineligible due to low average consumption only', () => {
    const input = {
      documentNumber: '21554495008',
      connectionType: 'biphase',
      consumptionClass: 'residential',
      tariffModality: 'conventional',
      consumptionHistory: [100, 120, 130],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toContain('Consumo muito baixo para tipo de conexão');
    expect(result.ineligibilityReasons).toHaveLength(1);
  });

  it('should be ineligible due to all three reasons', () => {
    const input = {
      documentNumber: '21554495008',
      connectionType: 'monophase',
      consumptionClass: 'poderPublico',
      tariffModality: 'azul',
      consumptionHistory: [100, 120, 130],
    };

    const result = execute(input);

    expect(result.eligible).toBe(false);
    expect(result.ineligibilityReasons).toEqual(
      expect.arrayContaining([
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita',
        'Consumo muito baixo para tipo de conexão',
      ])
    );
    expect(result.ineligibilityReasons).toHaveLength(3);
  });
});
