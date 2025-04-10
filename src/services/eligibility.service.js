import {
  ConsumptionClassEnum,
  TariffModalityEnum,
  ConnectionTypeEnum,
} from '../domain/eligibility.enums.js';

const ALLOWED_CLASSES = [
  ConsumptionClassEnum.RESIDENTIAL,
  ConsumptionClassEnum.INDUSTRIAL,
  ConsumptionClassEnum.COMMERCIAL,
];

const ALLOWED_MODALITIES = [TariffModalityEnum.CONVENTIONAL, TariffModalityEnum.WHITE];

const MINIMUM_CONSUMPTION = {
  [ConnectionTypeEnum.MONOPHASE]: 400,
  [ConnectionTypeEnum.BIPHASE]: 500,
  [ConnectionTypeEnum.TRIPHASE]: 750,
};

export function execute(data) {
  const { connectionType, consumptionClass, tariffModality, consumptionHistory } = data;

  const reasons = [];

  if (!ALLOWED_CLASSES.includes(consumptionClass)) {
    reasons.push('Classe de consumo não aceita');
  }

  if (!ALLOWED_MODALITIES.includes(tariffModality)) {
    reasons.push('Modalidade tarifária não aceita');
  }

  const averageConsumption = calculateAverageConsumption(consumptionHistory);
  const minimumRequired = MINIMUM_CONSUMPTION[connectionType];

  if (averageConsumption < minimumRequired) {
    reasons.push('Consumo muito baixo para tipo de conexão');
  }

  if (reasons.length > 0) {
    return {
      eligible: false,
      ineligibilityReasons: reasons,
    };
  }

  return {
    eligible: true,
    annualCO2Savings: calculateAnnualCO2Savings(averageConsumption),
  };
}

const calculateAverageConsumption = history => {
  const last12Months = history.slice(0, 12);
  const total = last12Months.reduce((sum, month) => sum + month, 0);
  return total / last12Months.length;
};

const calculateAnnualCO2Savings = averageConsumption => {
  const savings = (averageConsumption * 12 * 84) / 1000;
  return parseFloat(savings.toFixed(2));
};
