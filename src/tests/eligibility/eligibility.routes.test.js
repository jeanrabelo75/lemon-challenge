import request from 'supertest';
import app from '../../app.js';

describe('POST /eligibility', () => {
  it('should return 200 with eligible true', async () => {
    const response = await request(app)
      .post('/eligibility')
      .send({
        documentNumber: '21554495008',
        connectionType: 'biphase',
        consumptionClass: 'commercial',
        consumptionSubClass: 'commercial',
        tariffModality: 'conventional',
        consumptionHistory: [4000, 5000, 6000],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.eligible).toBe(true);
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).post('/eligibility').send({
      connectionType: 'biphase',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
  });

  it('should return 400 for invalid document number', async () => {
    const response = await request(app)
      .post('/eligibility')
      .send({
        documentNumber: '12345678900',
        connectionType: 'biphase',
        consumptionClass: 'commercial',
        consumptionSubClass: 'commercial',
        tariffModality: 'conventional',
        consumptionHistory: [4000, 5000, 6000],
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.details[0].message).toMatch(/Documento inválido/);
  });
});
