import {
  ConsumptionClasses,
  TariffModalities,
  ConnectionTypes,
} from '../domain/eligibility.enums.js';

export function execute(data) {
  const reasons = validateEligibility(data);

  if (reasons.length > 0) {
    return {
      eligible: false,
      ineligibilityReasons: reasons,
    };
  }

  const averageConsumption = calculateAverageConsumption(data.consumptionHistory);
  return {
    eligible: true,
    annualCO2Savings: calculateAnnualCO2Savings(averageConsumption),
  };
}

function validateEligibility(data) {
  const {
    connectionType,
    consumptionClass,
    tariffModality,
    consumptionHistory,
    consumptionSubClass,
  } = data;

  const reasons = [];

  const classEntry = ConsumptionClasses.find(c => c.name === consumptionClass);
  const isInvalidClass = !classEntry || !classEntry.allowed;
  const isInvalidSubClass = classEntry && !classEntry.subclasses.includes(consumptionSubClass);

  if (isInvalidClass) {
    reasons.push('Classe de consumo não aceita');
  }

  if (!isInvalidClass && isInvalidSubClass) {
    reasons.push('Subclasse não é permitida');
  }

  const modalityEntry = TariffModalities.find(t => t.name === tariffModality);
  if (!modalityEntry || !modalityEntry.allowed) {
    reasons.push('Modalidade tarifária não aceita');
  }

  const averageConsumption = calculateAverageConsumption(consumptionHistory);
  const requiredMinimum = ConnectionTypes[connectionType];
  if (averageConsumption < requiredMinimum) {
    reasons.push('Consumo muito baixo para tipo de conexão');
  }

  return reasons;
}

function calculateAverageConsumption(history) {
  const last12Months = history.slice(0, 12);
  const total = last12Months.reduce((sum, val) => sum + val, 0);
  return total / last12Months.length;
}

function calculateAnnualCO2Savings(averageConsumption) {
  const yearlyConsumption = averageConsumption * 12;
  const kgCO2 = (yearlyConsumption * 84) / 1000;
  return parseFloat(kgCO2.toFixed(2));
}
