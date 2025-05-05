export const ConsumptionClasses = Object.freeze([
  {
    id: 1,
    name: 'residential',
    allowed: true,
    subclasses: ['residential'],
  },
  {
    id: 2,
    name: 'industrial',
    allowed: true,
    subclasses: ['industrial'],
  },
  {
    id: 3,
    name: 'commercial',
    allowed: true,
    subclasses: [
      'administrationCondominial',
      'commercial',
      'telecommunicationServices',
      'transportServices',
    ],
  },
  {
    id: 4,
    name: 'publicPower',
    allowed: false,
    subclasses: ['publicPowerState', 'publicPowerMunicipal'],
  },
  {
    id: 5,
    name: 'rural',
    allowed: false,
    subclasses: ['agropecuariaRural'],
  },
]);

export const TariffModalities = Object.freeze([
  { id: 1, name: 'conventional', allowed: true },
  { id: 2, name: 'white', allowed: true },
  { id: 3, name: 'green', allowed: false },
  { id: 4, name: 'blue', allowed: false },
]);

export const ConnectionTypes = Object.freeze({
  monophase: 400,
  biphase: 500,
  triphase: 750,
});
